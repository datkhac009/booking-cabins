import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { HiChevronDown } from "react-icons/hi2";
import Heading from "../ui/Heading";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Accordion defaultExpanded sx={{ mt: 2, borderRadius: "var(--border-radius-md) !important" }}>
        <AccordionSummary expandIcon={<HiChevronDown />}>
          <Heading as="h3">Update user data</Heading>
        </AccordionSummary>
        <AccordionDetails>
          <UpdateUserDataForm />
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ mt: 2, borderRadius: "var(--border-radius-md) !important" }}>
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