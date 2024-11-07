import { Button, Card as UICard, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import placeholderImage from '../../assets/no-image.jpg';

type CardPropsType = {
  id: string;
  nickname: string;
  img?: string;
}

export default function Card({ id, nickname, img }: CardPropsType) {
  return (
    <UICard sx={{ width: 345 }}>
      <CardMedia
        sx={{ height: 250, backgroundSize: 'contain' }}
        image={img ?? placeholderImage}
        title={nickname}
        component={Link}
        to={`/superhero/${id}`}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {nickname}
        </Typography>
      </CardContent>
      <CardActions>
        <Button to={`/superhero/${id}`} component={Link} size="small">Learn more</Button>
      </CardActions>
    </UICard>
  )
}
