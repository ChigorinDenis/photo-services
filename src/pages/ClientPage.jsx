import React from "react";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Box, Typography, Grid} from "@material-ui/core";
import Card from "../components/Card"
import FeaturedPost from "../components/FeaturedPost";
import SimpleSnack from '../components/SnackBar';
import SideMenu from "../components/SideMenu";
import Basket from '../components/Basket';
import routes from "../routes";
import { serviceAllAdd } from "../reducers/serviceReducer";


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
  const auth = useSelector(state => state.auth);
  const { clientServiceFilter } = useSelector(state => state.ui);
  const services = useSelector(state => state.service);
  const filteredServices = clientServiceFilter === 'all' ? services : services.filter((f) => f.type === clientServiceFilter);
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
    <Box
      sx={{
        display:'flex',
        mt: 5,
        ml: 5
      }}
    >
      <SideMenu />
      <Container>
        <Box>
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
        {filteredServices.map((service) => (<Card key={service.id} card={service} />)).slice(0, 8)}
        </Box>
        <Grid container spacing={4}>
          {featuredPosts.map((post) => (
            <FeaturedPost key={post.title} post={post} />
          ))}
        </Grid>
      </Container>
    </Box>
    <SimpleSnack isOpen={auth.isAuth} text='Пользователь авторизован'/>
    <Basket />
    </>
  )
};

export default ClientPage;
