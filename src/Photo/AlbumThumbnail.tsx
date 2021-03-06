import React, { FunctionComponent } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography
} from "@material-ui/core";

interface Props {
  coverUrl: string;
  title: string;
  url: string;
}

export const AlbumThumbnail: FunctionComponent<Props> = ({
  coverUrl,
  title,
  url
}) => {
  return (
    <>
      <Card>
        <CardActionArea href={url}>
          <CardMedia
            component="img"
            image={coverUrl}
            title={title}
            height="300"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};
