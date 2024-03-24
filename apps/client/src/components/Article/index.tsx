import { FC } from "react";
import "./styles.scss";
import { Card } from "antd";
import { IArticle } from "../../types/IArticle";

export const Article: FC<IArticle> = ({ content }) => {
  return (
    <Card>
      <div
        className="article-wrapper"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Card>
  );
};
