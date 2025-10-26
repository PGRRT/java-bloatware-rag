import ContentWrapper from "@/components/ui/ContentWrapper";
import CustomPopover from "@/components/ui/CustomPopover";
import SelectInput from "@/components/ui/SelectInput";
import { useState } from "react";

const Navbar = () => {
  const [rag, setRag] = useState(null);

  const ragOptions = [
    {
      label: "Classical Rag",
      value: "classical_rag",
    },
    {
      label: "Jazz Rag",
      value: "jazz_rag",
    },
  ]
  return (
    <>
      <ContentWrapper padding="1rem">
        <SelectInput
          value={rag}
          onChange={setRag}
          options={ragOptions}
        />
       
      </ContentWrapper>
    </>
  );
};

export default Navbar;
