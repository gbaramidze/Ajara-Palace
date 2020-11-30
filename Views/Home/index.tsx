import * as React from "react";
import MenuPicker from "../../Components/MenuPicker";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../Components/Spinner";
import {Container} from "react-bootstrap";
import Welcome from "../../Components/Welcome";
import Helmet from 'react-helmet';

const Home = () => {
  const {categories, language, locale} = useSelector(state=>state);
  const controller = new AbortController();
  const dispatch = useDispatch();
  const getCategories = (): void => {
    dispatch({
      type: 'loading',
      payload: {
        loading: true,
      }
    });
    fetch("https://ajarapalace.ge/admin/ajax/?website_categories", {signal: controller.signal}).then(res => {
      return res.json()
    }).then(response => {
      dispatch({
        type: 'loading',
        payload: {
          loading: false,
        }
      });
      dispatch({
        type: 'categories',
        payload: {
          categories: response.categories
        }
      })
    }).catch()
  };

  React.useEffect(() => {
    if (categories.length === 0) {
      getCategories()
    }
  }, [categories]);

  return (
    <>
      <Helmet>
        <meta httpEquiv="content-language" content={language} />
        <meta name="keywords" content={locale.KEYWORDS} />
        <meta name="description" content={locale.DESCRIPTION} />
      </Helmet>
      <Welcome/>
      <Container>
      {
        categories.length ? (
          <MenuPicker data={categories}/>
        ) : <Spinner/>
      }
      </Container>
    </>
  )
};

export default Home;
