const loadApi = async (text) => {
    const resources = await fetch (`https://openapi.programming-hero.com/api/retro-forum/posts?category=${text}`);
    const data = await resources.json();
    const allPosts  = data.posts;
    displayPosts(allPosts)
};

const PostContainer = document.getElementById('PostContainer');

 const displayPosts = (allPosts) => {
  PostContainer.innerHTML = '';
    allPosts.forEach((post) => {
        const postDiv = document.createElement('div');
        postDiv.classList = `flex flex-col gap-10`
        postDiv.innerHTML = `
        <div class="w-full bg-[#F1F2FF] lg:h-72 flex gap-5 px-2 lg:px-8 py-2 lg:py-8 border-[1px] border-[#797DFC1A] rounded-2xl">
        <div id="active" class="avatar w-20 h-20">
        <div class="w-20 h-20 rounded-full">
          <img class="" src="${post.image}" />
        </div>
      </div>
          <div class="flex flex-col gap-5">
            <div class="flex gap-10 lg:text-lg font-semibold">
                <h6># <span>${post.category}</span></h6>
                <h6>Author :<span>${post.author.name}</span></h6>
            </div>
            <h1 id="postTitle" class="lg:text-2xl font-bold text-[#12132D]">${post.title}</h1>
            <p class="text-sm ">${post.description}</p>
            <hr class="bg-[#12132D40] h-[1px] w-[95%] ">
            <div class="flex justify-between">
            <div class="flex gap-10">
                <div class=""><i class="fa-regular fa-message"></i> <span>${post.comment_count}</span></div>
                <div id="postView" class=""><i class="fa-regular fa-eye"></i> <span>${post.view_count}</span></div>
                <div class=""><i class="fa-regular fa-clock"></i> <span>${post.posted_time}</span></div>
            </div>
            <button onclick="addPost('${post.title}' , '${post.view_count}')" class="w-12 h-12 rounded-full bg-[#10B981]"><i class="fa-solid fa-envelope-open text-2xl"></i></button>
          </div>
          </div>
        </div>
        `
        PostContainer.appendChild(postDiv);
      const active = document.getElementById('active');
        if(allPosts.isActive = true){
          active.classList.add('online')
        }
    });
    // --------------------loading stop--------------------
    spineer(false);
 };
 // ------------------- click card and add a card --------------------

 const addPost = (title , count ) => {

  // -------------counters --------------------

  const counter = document.getElementById('count');
  const countText = counter.innerText;
  const currentScoreTextInt = parseInt(countText);
  const currentNewScore = currentScoreTextInt + 1;
  counter.innerText = currentNewScore;


  // -----------------card add --------------------


  const addCard = document.getElementById('addCard');
  const addCardDiv = document.createElement('div');
  addCardDiv.classList = `flex flex-col gap-5`
  addCardDiv.innerHTML = `
  <div class="w-full bg-white flex gap-1 justify-between px-4 py-5 rounded-xl">
  <div class="">
      <h2 id="setPostTile" class="font-bold">${title}</h2>
  </div>
  <div class="">
      <div class="flex gap-2"><i class="fa-regular fa-eye mt-1"></i> <span>${count}</span></div>
  </div>
</div>
  `
  addCard.appendChild(addCardDiv);
};


// ----------------- search section -----------------

const blogSection = document.getElementById('blogSection');
blogSection.classList.add('hidden')

const search = () => {
  const blogSection = document.getElementById('blogSection');
  setTimeout (() =>{
    blogSection.classList.remove('hidden')
  } , 2000)
  const textValue = document.getElementById('textValue');
  const text = textValue.value;
  spineer(true);
  loadApi(text);
};

// -----------------spineer --------------------------------


const spineer = (isLoading) => {
  const loader = document.getElementById('loader');

  if(isLoading){
    loader.classList.remove('hidden');
  }
  else{
    setTimeout (() => {
      loader.classList.add('hidden');
    }, 2000 )
    
  }
};


// ------------------------- letest post --------------------


const resentPostContainer = document.getElementById('resentPostContainer');


const loadPost = async () =>  {
  const resources = await fetch (`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
  const data = await resources.json();
  displayLatestPosts(data);
}

const displayLatestPosts = (data) => {
  data.forEach((item) => {
    
    const resentPostDiv = document.createElement('div');
    resentPostDiv.classList = `grid lg:grid-cols-3 gap-10`
    resentPostDiv.innerHTML = `
    <div class="card lg:w-[400%] border-[1px]">
    <figure class="px-10 pt-10">
      <img src="${item.cover_image}" class="rounded-xl" />
    </figure>
    <div class="card-body">
     <div class="flex gap-2">
        <i class="fa-regular fa-calendar"></i>
        <p id="postDate">${item.author.posted_date ?? 'No Publish Date'}</p>
     </div>
     <div>
        <h1 class="text-xl font-bold text-[#12132D]">${item.title}</h1>
     </div>
     <div>
        <p class="p1">${item.description} </p>
     </div>

     <div class="flex gap-5 mt-2">
        <div class="avatar">
            <div class="w-14 h-14 rounded-full">
              <img src="${item.profile_image}" />
            </div>
          </div>
          <div>
            <h1 class="font-bold text-lg text-[#12132D]">${item.author.name}</h1>
            <p class="p1">${item.author.designation ?? 'Unknown'}</p>
          </div>
     </div>
    </div>
  </div>
    `

    resentPostContainer.appendChild(resentPostDiv);

    const postDate = document.getElementById('postDate');
    // if(item.author.posted_date == null) {
    //   postDate.innerText = 'hello'
    // }


  });
};




loadPost();
 loadApi();


