import logoImg from "../assets/quiz-logo.png";

export default function Header() {
    return (
        <header className="main_el">
            <img src={logoImg} alt="Main logo in ReactQuiz" />
            <h1>ReactQuiz</h1>
        </header>
    );
}
