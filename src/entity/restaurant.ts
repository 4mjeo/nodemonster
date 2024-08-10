import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';

import { User } from './user';
import { Menu } from './menu';

@Entity({ name: 'restaurant' })
export class Restaurant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    restaurantName: string;

    @Column()
    minOrderPrice: number;

    @Column()
    deliveryFee: number;

    @Column()   
    address: string;

    @Column()
    phoneNum: string;

    @Column()
    introduction: string;

    @ManyToOne(() => User, user => user.restaurant, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'sellerId' })
    user: User;

    @OneToMany(() => Menu, menu => menu.restaurant, { cascade: true })
    menu: Menu[];
}
