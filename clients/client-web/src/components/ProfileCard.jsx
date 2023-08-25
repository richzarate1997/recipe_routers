import {
  Card, CardContent,
  CardMedia, Divider,
  Typography
} from "@mui/material";

function ProfileCard({ imgUrl, imgDesc, name, description }) {
  return (
    <Card sx={{ maxWidth: 350, minHeight: 535 }}>
      <CardMedia
        component="img"
        height="360"
        src={imgUrl}
        alt={imgDesc}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Divider ></Divider>
        <Typography variant="body2" color="text.secondary" pt={2}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ProfileCard;