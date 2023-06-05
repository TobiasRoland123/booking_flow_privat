import { Modal } from "@mui/material";

export default function Timeout() {
  // styling for modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#000",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
          >
            You ran out of time
          </Typography>
          <Typography
            id="transition-modal-description"
            sx={{
              mt: 2,
            }}
          >
            You took too long to finish your booking. Please start over.
          </Typography>
          <div className="mt-10 flex justify-center">
            <Button
              className=" mb-10 h-10 gap-5 place-self-center rounded-none border-2 border-solid border-color-yellow px-6 font-sans font-semibold text-color-yellow hover:bg-color-yellow hover:text-color-black "
              onClick={handleClose}
            >
              <span className="pt-1">Try again</span>
            </Button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}
