import React from "react";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Box, Typography, Grid} from "@material-ui/core";
import Card from "../components/Card"
import FeaturedPost from "../components/FeaturedPost";
import SimpleSnack from '../components/SnackBar'
import Basket from '../components/Basket';
import routes from "../routes";
import { serviceAllAdd } from "../reducers/serviceReducer";

// const services = [
//   {
//     id: 1,
//     title: 'Печать фотографий',
//     img: '/img/print.webp',
//     price: 20
//   },
//   {
//     id: 2,
//     title: 'Печать на кружках',
//     img: '/img/print-cup.webp',
//     price: 390
//   },
//   {
//     id: 3,
//     title: 'Изготовление визиток',
//     img: '/img/make-badge.webp',
//     price: 310
//   },
//   {
//     id: 4,
//     title: 'Фото на холсте',
//     img: '/img/print-canvas.webp',
//     price: 600
//   },
//   {
//     id: 5,
//     title: 'Печать на футболках',
//     img: '/img/print-tshirt.webp',
//     price: 600
//   },
//   {
//     id: 6,
//     title: 'Календари',
//     img: '/img/make-calendar.webp',
//     price: 400
//   },
//   {
//     id: 7,
//     title: 'Переплеты диплома',
//     img: '/img/make-diplom.webp',
//     price: 300
//   },
//   {
//     id: 8,
//     title: 'Фотокнига',
//     img: '/img/photobook.webp',
//     price: 300
//   }
// ];
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
  const services = useSelector(state => state.service);
  const dispatch = useDispatch();
  
    React.useEffect(() => {
        const fetchData = async () => {
          try {   
            const response = await axios.get(routes('getServices')); 
            dispatch(serviceAllAdd(response.data))
          } catch(err) {    
            console.log(err);
          }
        }
       fetchData();
      }, []);
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
    <Basket />
    </>
  )
};

export default ClientPage;
