using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfiles : Profile {

  public AutoMapperProfiles() {
    CreateMap<AppUser, MemberDto>()
      .ForMember(
        m => m.Age,
        o => o.MapFrom(u => u.DateOfBirth.CalculateAge())
      )
      .ForMember(
        m => m.PhotoUrl,
        o => o.MapFrom(u => u.Photos.FirstOrDefault(p => p.IsMain)!.Url)
      );
    CreateMap<Photo, PhotoDto>();
  }

}
