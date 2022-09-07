import { Skeleton, Box, ImageListItem, ImageList } from "@mui/material";

export default function SkeletonComponent({ page }: any) {
  if (page === "home") {
    return (
      <ImageList cols={4} gap={20}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item: any) => (
          <ImageListItem key={item.img} className="hover:shadow-lg">
            <Skeleton variant="rectangular" height={218} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </ImageListItem>
        ))}
      </ImageList>
    );
  }

  return (
    <>
      {page !== "detail" && (
        <Skeleton variant="rectangular" className="!h-[320px] lg:!h-[660px]" />
      )}
      <Box sx={{ pt: 0.5 }}>
        {page === "detail" && (
          <div>
            <Skeleton />
            <Skeleton height={40} />
            <Skeleton />
            <Skeleton height={50} />
            <div className="flex items-center">
              <Skeleton height={50} width={100} className="!mr-5" />
              <Skeleton height={50} width={100} />
            </div>
          </div>
        )}
        <Skeleton />
        <Skeleton width="60%" />
      </Box>
    </>
  );
}
