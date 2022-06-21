import React from "react";
import Container from "@material-ui/core/Container";
import FeaturedPost from "../components/FeaturedPost";
import OrdersLayout from "../layouts/OrdersLayout";

const post = [
  {
    title: 'Фотограф Михаил',
    date: 'Вдохновляют улыбки людей',
    description:
      `Работаю фотографом уже более 5 лет. Профессионально подхожу к делу, ищу компромиссы в цветопередаче. 
      Пусть ваши воспоминания будут запечатлены.`,
    image: '/img/photographer1.jpg',
    imageLabel: 'Image Text',
  },
  {
    title: 'Фотограф ',
    date: 'Люблю торжественные и яркие дни',
    description:
      'Если вас заитересовало мое творчество, то смелее записывайтесь ко мне на фотоссесии.',
      image: '/img/photographer2.avif',
    imageLabel: 'Image Text',
  },
];

const PhotographerPage = () => {
  return (
    <Container>
      <FeaturedPost  post={post[0]} portfolio={false}/>
      <OrdersLayout />
    </Container>
    
  )
};

export default PhotographerPage;
