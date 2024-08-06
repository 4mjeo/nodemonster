import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { Post } from '../entity/post';
import { User } from '../entity/user';
import { PostInfo, PostUpdateInfo} from '../shared/DataTransferObject';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
    static getQueryRepository() {
        return getCustomRepository(PostRepository);
    }

    async createPost(postInfo: PostInfo, user: User): Promise<Post> {
        const newPost = new Post();

        newPost.title = postInfo.title;
        newPost.content = postInfo.content;
        newPost.writer = user.id;

        return this.save(newPost);
    }

    async updatePost(postUpdateInfo: PostUpdateInfo, user: User) {
        return this.update(
            {
                id: postUpdateInfo.id,
                writer: user.id,
            },
            {
                title: postUpdateInfo.title,
                content: postUpdateInfo.content,
            },
        );
    }

    async deletePost(postId: number, user: User) {
        return this.delete({
            id: postId,
            writer: user.id
        });
    }

    async getOnePost(postId: number): Promise<Post> {
		return this.createQueryBuilder('post')
			.select('post.id')
			.addSelect('post.title')
			.addSelect('post.text')
			.addSelect('post.createdAt')
			.addSelect('post.updatedAt')
			.addSelect('user.nickname')
			.addSelect('user.nickname')
			.where('post.id = :postId', {
				postId,
			})
			.getOne();
	}

    async getAllPost() {
		return this.createQueryBuilder('post')
			.select('post.id')
			.addSelect('post.title')
			.addSelect('post.text')
			.addSelect('post.createdAt')
			.addSelect('post.updatedAt')
			.addSelect('user.nickname')
			.addSelect('seller.nickname')
			.getMany();
	}

    async checkPost(postId: number): Promise<Post> {
        return this.findOne({ id: postId });
    }

}