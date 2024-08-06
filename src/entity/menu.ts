import {
    Column,
    JoinColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { Restaurant } from './restaurant';

@Entity({ name: 'menu' })
export class Menu {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Restaurant, restaurant => restaurant.menus, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn()
    restaurant: Restaurant;

    @Column()
    foodName: string;

    @Column()
    foodPrice: string;
}