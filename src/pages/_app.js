import {Component} from "react";
import Head from 'next/head';

class App extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    window.location.replace(this.props.props.new_url);
  }

  render() {
    return (
        <div >
          <Head >
            {this.props.props.parsedMetaTags.map((tag, index) => (
                <meta key={index} {...tag} />
            ))}
  <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-GMQTQSW3NS"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-GMQTQSW3NS');
</script>
          </Head>
        </div>
    )
  }
}
export default App;

App.getInitialProps = async (context) => {
  let path_origin =context.router.asPath
  let replace_domain = process.env.url;
  let new_url = replace_domain+path_origin;
  const response = await fetch(new_url);
  const postData = await response.text();
  const metaTags = postData.match(/<meta[^>]*>/g);
  const parsedMetaTags = metaTags.map(tag => {
    const nameMatch = tag.match(/name=["']([^"']*)["']/);
    const propertyMatch = tag.match(/property=["']([^"']*)["']/);
    const contentMatch = tag.match(/content=["']([^"']*)["']/);

    return {
      name: nameMatch ? nameMatch[1] : '',
      property: propertyMatch ? propertyMatch[1] : '',
      content: contentMatch ? contentMatch[1] : '',
    };
  });
  // Trả về dữ liệu như là props
  return {
    props: {
      parsedMetaTags,
      new_url
    },
  };
}
