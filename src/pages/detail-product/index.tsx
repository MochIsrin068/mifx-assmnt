import {
  Box,
  Button,
  Divider,
  Rating,
  Typography,
  Link,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowLeft from "@mui/icons-material/ArrowLeft";
import ArrowRight from "@mui/icons-material/ArrowRight";
import Layout from "../../layout";
import { Carousel } from "react-responsive-carousel";

import useDetailProduct from "../../hooks/useDetailProduct";
import SkeletonComponent from "../../components/Skeleton";

export default function DetailProduct() {
  const {
    currentSlide,
    onNextChangeCarousel,
    onPrevChangeCarousel,
    updateCurrentSlide,
    product,
    onBuy,
    onAddToCart,
    snackBarMessage,
    onHandleCloseSnakbar,
  }: any = useDetailProduct();

  return (
    <>
      <Layout>
        <div className="lg:px-28 lg:py-12 px-4 py-4 h-screen w-full">
          <Link href="/" className="flex items-center">
            <ArrowBack className="!text-black" />
            <Typography variant="h6" className="!font-bold !ml-2 !text-black">
              Kembali
            </Typography>
          </Link>
          <div className="flex flex-col lg:flex-row justify-center mt-5">
            <Box className="w-2/3 mr-10">
              {product.isLoading ? (
                <SkeletonComponent />
              ) : (
                <Carousel
                  autoPlay
                  infiniteLoop
                  showIndicators={false}
                  showStatus={false}
                  showArrows={false}
                  autoFocus
                  selectedItem={currentSlide}
                  onChange={updateCurrentSlide}
                  // width={660}
                  className="!w-full lg:!w-[660px]"
                >
                  {product?.items?.images?.map((image: any) => (
                    <div>
                      <img
                        src={`${image}`}
                        srcSet={`${image}`}
                        alt={`${product.items.name}`}
                        loading="lazy"
                        className="rounded-lg !bg-gray-200"
                      />
                      <div className="legend !opacity-90 hover:!opacity-100 !flex !justify-end !bg-transparent">
                        <div className="flex items-center bg-[#0d0f13] rounded-md">
                          <IconButton onClick={onPrevChangeCarousel}>
                            <ArrowLeft className="!text-white" />
                          </IconButton>
                          <span>
                            {currentSlide + 1}/{product.items.images.length}
                          </span>
                          <IconButton onClick={onNextChangeCarousel}>
                            <ArrowRight className="!text-white" />
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  ))}
                </Carousel>
              )}
            </Box>
            <Box className="w-full">
              {product.isLoading ? (
                <SkeletonComponent page="detail" />
              ) : (
                <>
                  <Typography
                    variant="subtitle1"
                    className="text-red-700 !text-sm !font-bold"
                  >
                    {product.items.off === ""
                      ? ""
                      : `SALE ${product.items.off}`}
                  </Typography>
                  <Typography variant="h5" className="!font-bold !mt-1">
                    {product.items.name}
                  </Typography>
                  <div className="flex items-center my-3">
                    <Rating
                      value={product.items.rating}
                      readOnly
                      name="half-rating-read"
                      precision={0.5}
                    />
                    <Typography
                      variant="subtitle1"
                      className="text-gray-500 !ml-2"
                    >
                      ({product.items.reviewCount} reviews)
                    </Typography>
                  </div>
                  <Typography variant="h4" className="!font-bold !mt-5 !mb-10">
                    {product.items.price}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    className="text-gray-500 !mb-5"
                  >
                    {product.items.description}
                  </Typography>
                  <Divider />
                  <div className="flex mt-10 mb-7">
                    <Button
                      variant="contained"
                      color="warning"
                      startIcon={<ShoppingCart />}
                      className="!mr-3 !normal-case !text-black !font-bold !bg-[#f8c244]"
                      size="large"
                      onClick={onAddToCart}
                    >
                      Add to cart
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      className="!normal-case !font-bold !bg-[#4aa45c]"
                      size="large"
                      onClick={onBuy}
                    >
                      Buy Now
                    </Button>
                  </div>
                </>
              )}
            </Box>
          </div>
        </div>

        <Snackbar
          open={snackBarMessage}
          autoHideDuration={6000}
          onClose={onHandleCloseSnakbar}
        >
          <Alert
            onClose={onHandleCloseSnakbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            {snackBarMessage}
          </Alert>
        </Snackbar>
      </Layout>
    </>
  );
}
