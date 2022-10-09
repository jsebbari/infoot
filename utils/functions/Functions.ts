export const imageArticle = (category: string) => {
  switch (category.toLowerCase()) {
    case "autre":
      return "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c29jY2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60";

    case "serie a":
      return "https://d107a8nc3g2c4h.cloudfront.net/blog/wp-content/uploads/2019/02/regarder-serie-a.jpg";

    case "premier league":
      return "https://sportbusiness.club/wp-content/uploads/2020/08/Football-Premier-League-1-logo.jpg";

      case "ligue 1":
        return "https://assets-fr.imgfoot.com/ballon-uhlsport-ligue-1-2021-2022-img2.jpg";

    default:
      return "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHNvY2NlcnxlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60";
  }
};

export const firstLetterCase = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const splitText = (str: string, long: number) => {
  return str.split(" ").splice(0, long).join(" ");
};



