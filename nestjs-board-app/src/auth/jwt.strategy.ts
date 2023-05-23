import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity';

// 다른 곳에서도 사용할 수 있도록
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // 기본 전략을 passport-jwt에서 가져온 strategy를 사용

  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      // 토큰이 유효한지 확인하는 용도
      secretOrKey: 'Secret12345',
      // 토큰을 어디서 가져오는지. 헤더의 BearerToken 타입
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // 위에서 토큰이 유효한지 확인되면,
  // validate 메서드에서 payload에 있는 username이 DB에 있는 유저인지 확인
  // 있다면 user 객체를 반환
  // 반환된 값은 @UseGuards(AuthGuard())를 이용한 모든 요청의 Request Object에 들어감
  async validate(payload) {
    const { username } = payload;
    const user: User = await this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
