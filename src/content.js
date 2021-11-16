const nicoEx = {
  onload: async ()=>{
    console.log('[nicoEx]', 'nicoEx loading...')
    let dom = document.createElement('a');
    dom.setAttribute('class', 'MainMenuItem nicoEx');
    dom.setAttribute('href', 'javascript:void(0)');
    dom.innerText = 'マイリス拡張';
    document.querySelector('.MainMenuContainer-right').before(dom);
    document.querySelector('.nicoEx').addEventListener('mouseup', event=>{
      document.querySelector('.MainMenuContainer-activeBorder').style = "transform: translateX(624px);";
      document.querySelector('.MainMenuItem-active').classList.toggle('MainMenuItem-active');
      event.target.classList.toggle('MainMenuItem-active');
      event.target.setAttribute('area-current', 'page');
      history.replaceState(null, '', 'mylistex?ref=pc_mypage_menu');
      document.querySelectorAll('.MainMenuItem').forEach(val=>val.addEventListener('mouseup', event=>{location.href = event.target.href.split(/\?/)[0]}));
      nicoEx.place();
    });
  },
  place: async ()=>{
    let idlist = nicoEx.getVideoIdList();
    let dom = document.createElement('div');
    dom.setAttribute('class', 'nicoExMylist');
    console.log('nicoEx mylist', idlist);
    if(!idlist.length){
      dom.innerText = "マイリス拡張に動画がありません";
    } else{
      let ev = [];
      idlist.forEach(id=>ev.push((async()=>{ // async call
        let section = document.createElement('div');
        // https://dic.nicovideo.jp/a/%E3%83%8B%E3%82%B3%E3%83%8B%E3%82%B3%E5%8B%95%E7%94%BBapi
        let data = await fetch(`https://ext.nicovideo.jp/api/getthumbinfo/${id}`);
      })()));
      await Promise.allSettled(ev);
    }
    document.querySelector('.UserPage-main').children[0].remove();
    document.querySelector('.UserPage-main').appendChild(dom);
  },
  getVideoIdList: ()=>{
    let result = localStorage.getItem('nicoEx');
    if(result === null){
      localStorage.setItem('nicoEx', '');
      return [];
    }
    if(result == "") return [];
    result = result.split(/,/g).map(id=>`sm${id}`);
    return result;
  },
};

nicoEx.onload();