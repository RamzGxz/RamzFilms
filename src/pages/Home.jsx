import Banner from "../components/Banner"
import Header from "../components/Header"

const Home = () => {
    return (
        <div>
            <Header />

            <div className="py-3 ">
                <div className="" style={{
                    marginTop: '5%'
                }}>
                    <Banner />
                </div>
            </div>
        </div>
    )
}

export default Home