import { useNavigate, useParams } from "react-router-dom";

const Description = () => {
  const params = useParams();
  const { token } = params;
  const navigate = useNavigate();

  return <div>Description</div>;
};

export default Description;
