import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

import { Post } from './post';

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false, length: 15 })
    nickname: string;

    @Column({ unique: true, nullable: false, length: 40 })
    email: string;

    @Column({ nullable: false })
    password: string;

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
    updatedAt: Date

    @OneToMany(() => Post, post => post.user, { cascade: true })
	post: Post[];
}
