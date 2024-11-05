import { Button, Card as UICard, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

type CardPropsType = {
  id: string;
  nickname: string;
  img: string;
}

export default function Card({ id, nickname, img }: CardPropsType) {
  return (
    <UICard sx={{ width: 345 }}>
    <CardMedia
      sx={{ height: 140 }}
      image={img}
      title={nickname}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {nickname}
      </Typography>
    </CardContent>
    <CardActions>
      <Button to={`/superhero/${id}`} component={Link} size="small">Learn more</Button>
    </CardActions>
  </UICard>
  )
}
