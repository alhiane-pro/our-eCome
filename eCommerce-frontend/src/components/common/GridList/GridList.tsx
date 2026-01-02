import { LottieHandler } from "@/components/feedback";
import { Col, Row } from "react-bootstrap";

type HasID = { id?: number };

interface GridListProps<T extends HasID> {
  records: T[];
  renderItem: (record: T) => React.ReactNode;
  title: string;
  message: string;
}

// Render Props Pattern
const GridList = <T extends HasID>({
  records,
  renderItem,
  title,
  message,
}: GridListProps<T>) => {
  return (
    <Row style={{ rowGap: "3rem" }}>
      {records.length > 0 ? (
        records.map((record) => (
          <Col
            key={record.id}
            xs={6}
            md={3}
            className="d-flex justify-content-center"
          >
            {renderItem(record)}
          </Col>
        ))
      ) : (
        <LottieHandler
          type="empty"
          title={title}
          message={message}
          className="text-info"
        />
      )}
    </Row>
  );
};

export default GridList;
