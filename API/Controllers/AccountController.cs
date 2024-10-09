using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(DataContext context, ITokenService tokenService) : BaseApiController {

  [HttpPost("register")] // account/register
  public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto) {
    if (await UserExist(registerDto.Username)) return BadRequest("Username is taken");

    return Ok();

    // using var hmac = new HMACSHA512();
    // var user = new AppUser {
    //   UserName = registerDto.Username.ToLower(),
    //   PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
    //   PasswordSalt = hmac.Key
    // };

    // context.Users.Add(user);
    // await context.SaveChangesAsync();

    // return user;
  }

  async Task<bool> UserExist(string username) =>
    await context.Users.AnyAsync(u => u.UserName.ToLower() == username.ToLower());

  [HttpPost("login")]
  public async Task<ActionResult<UserDto>> Login(LoginDto loginDto) {
    var user = await context.Users.FirstOrDefaultAsync(u => u.UserName == loginDto.UserName.ToLower());
    if (user is null) return Unauthorized("Invalid user name");

    using var hmac = new HMACSHA512(user.PasswordSalt);
    var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

    for (int i = 0; i < computedHash.Length; i++) {
      if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
    }

    return new UserDto {
      Username = user.UserName,
      Token = tokenService.CreateToken(user)
    };
  }
}
