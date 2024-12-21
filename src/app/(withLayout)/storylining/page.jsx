import { MyLinkButton } from "@/components/shared/common/my-link-button";
import MySectionTitle from "@/components/shared/common/my-section-title";

import MySpacer from "@/components/shared/common/my-spacer";
import StoryLiningLayoutComponent from "./storylining-layout";

const FramingPage = () => {
  return (
    <StoryLiningLayoutComponent>
      <MySectionTitle title={"Introduction"} className={"py-8"} />

      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum. <br /> <br />
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
        <br /> <br />
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>

      <MySpacer className="h-6" />
      <MyLinkButton
        href={"/storylining/headline?toolId=65f81884ea44df0751d0a15b"}
        className="uppercase"
      >
        Start here
      </MyLinkButton>
    </StoryLiningLayoutComponent>
  );
};

export default FramingPage;
