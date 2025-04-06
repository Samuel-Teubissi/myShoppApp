const AboutPage = () => {
    const location = 'http://localhost/MyShopI/'
    const link = location + "assets/img/art.jpg"
    return <>
        <div className="about">
            <div className="about_img"><img src={link} alt="Author" className="max-w-none rounded-full" /></div>
            <p>
                <span className="lbl">Le site a été crée en 2024 par Yamê Bantu.</span><br /><br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum molestiae natus corrupti est doloribus officia dignissimos quo corporis, dolore exercitationem, eveniet ullam maxime ducimus quas quam perferendis quod? Consequatur, cum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis magni atque ipsam doloribus inventore consectetur deleniti id, ducimus nihil culpa, itaque in molestias dolorem. Totam quasi eveniet quibusdam impedit libero! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum repellat cumque perferendis doloremque aliquam ullam cum incidunt dolor maiores magnam vitae consequuntur minima libero, reiciendis totam, sint magni nemo, aut assumenda reprehenderit! Quisquam officiis, totam deleniti a voluptatem quaerat fugit dignissimos nisi nostrum voluptatibus accusantium quam veritatis corrupti rem eligendi unde maxime! Autem nesciunt sit aut, obcaecati repudiandae expedita architecto iusto recusandae nemo, dicta, ea accusantium! Natus ducimus ratione blanditiis ad rem veniam distinctio ut porro sint, fugiat eligendi qui magni ipsum delectus sit dignissimos. A voluptatem doloribus quisquam obcaecati accusantium totam, cumque perferendis vero provident at? Quam, architecto amet!
            </p>
        </div>
    </>
}

export default AboutPage