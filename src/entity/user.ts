import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

import { Post } from './post';
import { Restaurant } from './restaurant';
import { Role, UserType } from './enum/usertype';

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

    @Column({
        type: 'enum',
        enum: UserType,
        nullable: false,
        default: UserType.customer,
    })
    type: UserType;

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

    @OneToMany(() => Restaurant, restaurant => restaurant.user, { cascade: true })
    restaurant: Restaurant[];
}
