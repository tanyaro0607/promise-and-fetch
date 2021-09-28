const onError = (error) => {
    const node = document.createElement('div');
    node.style = 'width: 180px; margin: 0 auto; text-align: center; background-color: red;';
  
    node.textContent = error;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  
  const loadImage = (url) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(`Не удалось загрузить изображение: ${url}`);
      image.src = url;
    });
  };
  
  const drawImages = (images) => {
    images.forEach((picture) => {
      picture.width = 180;
      document.body.appendChild(picture);
    });
  };
  
  const whenUserListLoaded = fetch('https://api.github.com/users');
  
  whenUserListLoaded
    .then((response) => {
  
      if (response.ok) {
        return response.json();
      }
  
      throw new Error(`Неизвестный статус: ${response.status} ${response.statusText}`);
    })
    .then((users) => users.map((user) => loadImage(user.avatar_url)))
    .then((avatarPromises) => Promise.all(avatarPromises))
    .then((images) => drawImages(images))
    .catch(onError);
