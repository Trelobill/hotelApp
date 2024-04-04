import { Modal, Typography } from "antd";

const OrderModal = ({ session, orderedBy, showModal, setShowModal }) => {
  const { Paragraph } = Typography;
  return (
    <Modal
      open={showModal}
      title={
        <span style={{ fontSize: "24px", textDecoration: "underline" }}>
          Order Payment Info
        </span>
      }
      onCancel={() => setShowModal(!showModal)}
      footer={null}
    >
      <br />
      <Paragraph>
        <strong>Payment Intent:</strong> {session.payment_intent}
      </Paragraph>
      <Paragraph>
        <strong>Payment Status:</strong> {session.payment_status}
      </Paragraph>
      <Paragraph>
        <strong>Amount Total:</strong> {session.amount_total / 100} €
      </Paragraph>
      <Paragraph>
        <strong>Customer:</strong> {orderedBy.name}
      </Paragraph>
    </Modal>
  );
};

export default OrderModal;
