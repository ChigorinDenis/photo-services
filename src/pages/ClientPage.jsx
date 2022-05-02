import React from "react";
import { useSelector } from 'react-redux';
import { Container, Box, Typography, Grid} from "@material-ui/core";
import Card from "../components/Card"
import FeaturedPost from "../components/FeaturedPost";
import SimpleSnack from '../components/SnackBar'


const services = [
  {
    id: 1,
    title: 'Печать фотографий',
    img: '/img/print.webp',
    price: '20р.'
  },
  {
    id: 2,
    title: 'Печать на кружках',
    img: '/img/print-cup.webp',
    price: '390р.'
  },
  {
    id: 3,
    title: 'Изготовление визиток',
    img: '/img/make-badge.webp',
    price: '310р.'
  },
  {
    id: 4,
    title: 'Фото на холсте',
    img: '/img/print-canvas.webp',
    price: '600р.'
  },
  {
    id: 5,
    title: 'Печать на футболках',
    img: '/img/print-tshirt.webp',
    price: '600р.'
  },
  {
    id: 6,
    title: 'Календари',
    img: '/img/make-calendar.webp',
    price: '400р.'
  },
  {
    id: 7,
    title: 'Переплеты диплома',
    img: '/img/make-diplom.webp',
    price: '300р.'
  },
  {
    id: 8,
    title: 'Фотокнига',
    img: '/img/photobook.webp',
    price: '300р.'
  }
];
const featuredPosts = [
  {
    title: 'Фотограф Михаил',
    date: 'Вдохновляют улыбки людей',
    description:
      'Если вас заитересовало мое творчество, то смелее записывайтесь ко мне на фотоссесии.',
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
const ClientPage = () => {
  const auth = useSelector(state => state.auth)
  return (
    <>
    <Container>
      <Box
       sx={{
         mt: 5
       }}
      >
      <Typography gutterBottom variant="h5" component="div" sx={{color: 'secondary.main'}}>
          Добро пожаловать в мир фотографий!
        </Typography>
        <Typography variant="body2">
        Наш фотосалон – это долгожданный момент творчества, вдохновение, радость, уникальные дизайны и невероятно красивые решения.
          Для тех, кто ценит качество и индивидуальность, отражающую личный вкус, стиль и предпочтения.
          Это творческая лаборатория, где люди на основе снимков и изображений создают шедевры для себя, родных и друзей.
        </Typography>
      </Box>
      <Box
        sx={{ 
          mt:5,
          mb:5,
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridRowGap: 20,
          gridColumnGap: 50,
        }}
      >
        {services.map((service) => (<Card key={service.id} card={service} />))}
      </Box>
      <Grid container spacing={4}>
        {featuredPosts.map((post) => (
          <FeaturedPost key={post.title} post={post} />
        ))}
      </Grid>
    </Container>
    <SimpleSnack isOpen={auth.isAuth} text='Пользователь авторизован'/>
    </>
  )
};

export default ClientPage;
