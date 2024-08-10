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

    @ManyToOne(() => Restaurant, restaurant => restaurant.menu, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'restaurantId' })
    restaurant: Restaurant;

    @Column()
    foodName: string;

    @Column()
    foodPrice: string;
}
