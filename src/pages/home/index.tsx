import React from "react";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Box,
  Typography,
  Tooltip,
  Divider,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import Layout from "../../layout";
import useProduct from "../../hooks/useProduct";
import SkeletonComponent from "../../components/Skeleton";

export default function Home() {
  const { product } = useProduct();

  return (
    <>
      <Layout>
        <div className="py-3 px-3 lg:py-10 lg:px-16 bg-gray-50 w-full h-screen">
          <Box className="w-full h-full overflow-y-scroll bg-white p-6 rounded-md shadow-xl">
            <Typography variant="h5" className="!font-bold">
              Products Catalog
            </Typography>
            <Divider className="!my-5" />
            {product.isLoading ? (
              <SkeletonComponent page="home" />
            ) : (
              <ImageList cols={4} gap={20}>
                {product.items.map((item: any) => (
                  <ImageListItem key={item.image} className="hover:shadow-lg">
                    <img
                      src={`${item.image}`}
                      srcSet={`${item.image}`}
                      alt={item.name}
                      loading="lazy"
                      className="rounded-t-xl !bg-gray-200"
                    />
                    <ImageListItemBar
                      title={
                        <Typography variant="h5" gutterBottom>
                          {item.name}
                        </Typography>
                      }
                      subtitle={
                        <Typography
                          variant="subtitle1"
                          className="!font-bold"
                          gutterBottom
                        >
                          {item.price}
                        </Typography>
                      }
                      actionIcon={
                        <Tooltip title="Show Detail">
                          <IconButton
                            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                            aria-label={`info about ${item.name}`}
                            href={`/product/${item.id}`}
                          >
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      }
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            )}
          </Box>
        </div>
      </Layout>
    </>
  );
}
