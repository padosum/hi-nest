import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  // async createBoard(createBoardDto: CreateBoardDto, user: User) : Promise<Board> {
  //     const {title, description} = createBoardDto;
  //     const board = this.create({
  //         title,
  //         description,
  //         status: BoardStatus.PUBLIC,
  //         user
  //     })
  //     await this.save(board);
  //     return board;
  // }
}
