import { Module } from '@nestjs/common';

// 데코레이터
@Module({
  imports: [],
  controllers: [], // url을 가져오고 함수를 실행한다. (express의 라우터같은 존재)
  providers: [],
})

// 모든 모듈의 루트
// 모듈은 애플리케이션의 일부
export class AppModule {}
