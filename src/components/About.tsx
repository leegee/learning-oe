import './About.css';

const AboutComponent = () => {
    return (
        <section className="card about">
            <h2>About This App</h2>
            <p>
                This little app was written in under a week to help me
                learn a little Old English, but written in such a way
                that it can easily be reconfigured with just a text editor
                to quiz the user on any subject.
            </p>
            <footer>
                &mdash; <a title='E-mail' href='mailto:leegee@gmail.com'>Lee Goddard</a>, Gödöllő, 2025
            </footer>
        </section>
    );
};

export default AboutComponent;
