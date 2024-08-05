import { User} from '../entity/user';
import { PostRepository } from '../repository/post.repository';
import { PostInfo } from '../shared/DataTransferObject';
import { ForbiddenError, NotFoundError } from '../shared/exception';

export class PostServicee {
    constructor(
        private postRepository: PostRepository,
    ) {}

    async createPost(postInfo: PostInfo, user: User) {
        return this.postRepository.createPost(postInfo, user);
    }
}