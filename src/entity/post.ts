import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

import { User } from './user';

@Entity({ name: 'post' })
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    seller: number;

    @Column({ charset: 'utf8mb4', collation: 'utf8mb4_general_ci', length: 25 })
    title: string;

    @Column({ type: 'text', charset: 'utf8mb4', collation: 'utf8mb4_general_ci' })
    content: string;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: false,
        name: 'createdAt',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        nullable: false,
        name: 'updatedAt',
    })
    updatedAt: Date;

    @ManyToOne(() => User, user => user.id, { nullable: false, onDelete: 'CASCADE' })
	@JoinColumn({ name: 'seller' })
	user: User;
}
