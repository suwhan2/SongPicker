import { useNavigate } from "react-router-dom";

type ButtonProps = {
  text: string;
};

const Button = (props: ButtonProps) => {
  const navigate = useNavigate()
  return (
    <div
      className="btn w-[480px] h-20 rounded-[10px] bg-gradient-to-r from-blue to-[#991571] border-none shadow font-pyeongchang text-5xl text-white font-thin"
      onClick={()=>{
        navigate('/paying')
      }}
    >
      {props.text}
    </div>
  );
};

export default Button;
