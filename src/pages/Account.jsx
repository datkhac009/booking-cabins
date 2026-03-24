import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { HiChevronDown } from "react-icons/hi2";
import Heading from "../ui/Heading";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";

const accordionSx = {
  mt: 2,
  backgroundColor: "var(--color-grey-0)",
  color: "var(--color-grey-700)",
  border: "1px solid var(--color-grey-200)",
  borderRadius: "18px !important",
  boxShadow: "var(--shadow-md)",
  overflow: "hidden",

  "&::before": {
    display: "none",
  },

  "&.Mui-expanded": {
    marginTop: "1.6rem",
    marginBottom: 0,
  },

  "& .MuiAccordionSummary-root": {
    minHeight: "7.6rem",
    padding: "0 1.8rem",
    backgroundColor: "var(--color-grey-0)",
    color: "var(--color-grey-700)",
  },

  "& .MuiAccordionSummary-root.Mui-expanded": {
    minHeight: "7.6rem",
    backgroundColor: "var(--color-grey-0)",
    borderBottom: "1px solid var(--color-grey-200)",
  },

  "& .MuiAccordionSummary-content": {
    margin: "1rem 0",
    alignItems: "center",
  },

  "& .MuiAccordionSummary-content.Mui-expanded": {
    margin: "1rem 0",
  },

  "& .MuiAccordionSummary-expandIconWrapper": {
    color: "var(--color-brand-500)",
    fontSize: "1.8rem",
    transition: "all 0.25s ease",
  },

  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
    color: "var(--color-brand-600)",
  },

  "& .MuiAccordionDetails-root": {
    padding: "1.2rem",
    backgroundColor: "var(--color-grey-0)",
  },

  "&:hover": {
    borderColor: "var(--color-brand-200)",
  },
};

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Accordion defaultExpanded sx={accordionSx}>
        <AccordionSummary expandIcon={<HiChevronDown />}>
          <Heading as="h3">Update user data</Heading>
        </AccordionSummary>
        <AccordionDetails>
          <UpdateUserDataForm />
        </AccordionDetails>
      </Accordion>

      <Accordion sx={accordionSx}>
        <AccordionSummary expandIcon={<HiChevronDown />}>
          <Heading as="h3">Update password</Heading>
        </AccordionSummary>
        <AccordionDetails>
          <UpdatePasswordForm />
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default Account;