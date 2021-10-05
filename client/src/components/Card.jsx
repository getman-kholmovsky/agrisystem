import styled from 'styled-components';
import img from '../img/coffee.jpg';
import { Link } from 'react-router-dom';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: inherit;
  }
`;

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
  },
  media: {
    height: 200,
  },
});
const StyledCard = styled(Card)`
  margin-right: 1rem;
  margin-bottom: 2rem;
`;
const StyledCardMedia = styled(CardMedia)``;
export default function MediaCard({ data }) {
  const classes = useStyles();
  let imageSrc = data.small_image ? data.small_image : data.big_image;
  imageSrc = imageSrc ? '/' + imageSrc : img;

  return (
    <StyledCard className={classes.root}>
      <CardActionArea>
        <StyledLink to={`/plant/${data._id}`}>
          <StyledCardMedia className={classes.media} image={imageSrc} />
          <CardContent>
            <Typography gutterBottom variant='h4' component='h2'>
              {data.name}
            </Typography>
            <Typography variant='body1' color='textSecondary' component='p'>
              {data.excerpt}
            </Typography>
          </CardContent>
        </StyledLink>
      </CardActionArea>
      <CardActions>
        <Button size='large' color='primary'>
          <StyledLink to={`/plant/${data._id}`}>Подробнее</StyledLink>
        </Button>
      </CardActions>
    </StyledCard>
  );
}
