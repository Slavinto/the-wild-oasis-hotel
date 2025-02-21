import TestModal from "@/ui/testing/TestModal";

const Testing = () => {
    return (
        <section>
            <TestModal>
                <TestModal.Toggle>
                    <button>Open Modal</button>
                </TestModal.Toggle>
                <TestModal.Window>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Dicta, fuga? Ipsum dolore nam animi, libero ratione, facilis
                    quas alias, aliquam dolorem dolores repellendus tempora
                </TestModal.Window>
            </TestModal>
        </section>
    );
};

export default Testing;
