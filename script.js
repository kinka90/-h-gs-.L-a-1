// public/script.js
(function(){
  'use strict';
  const $ = id => document.getElementById(id);

  // ======================
  // Data Kamus
  // ======================
  const DICT = {
    "Kata Benda": {
      "Keluarga": [
        {"ind":"ayah","ter":"baba","img":"https://img.freepik.com/premium-photo/3d-illustration-cartoon-character-with-happy-expression-his-face_1057-44581.jpg?w=360"},
        {"ind":"ibu","ter":"yaya","img":"https://img.freepik.com/free-photo/celebration-labour-day-with-3d-cartoon-portrait-working-woman_23-2151306628.jpg?semt=ais_hybrid&w=740&q=80"},
        {"ind":"anak","ter":"ana","img":"https://marketplace.canva.com/4aiT4/MAGid44aiT4/1/tl/canva-happy-cartoon-boy-drawing-outdoors-MAGid44aiT4.jpg"},
        {"ind":"anak laki laki","ter":"ngofa nunau","img":"https://png.pngtree.com/png-clipart/20250119/original/pngtree-3d-animated-boy-character-with-cool-outfit-and-energetic-pose-png-image_19860542.png"},
        {"ind":"anak perempuan","ter":"ngofa foheka","img":"https://i.pinimg.com/236x/56/e5/06/56e506857047aa0d16225da817f68108.jpg"},
        {"ind":"kakak","ter":"abang","img":"https://img.freepik.com/foto-gratis/pria-kebugaran-kartun-3d_23-2151691490.jpg"},
        {"ind":"adik","ter":"adek","img":"https://png.pngtree.com/png-vector/20250823/ourmid/pngtree-2d-animated-character-for-a-kids-anime-style-character-character-png-image_17303971.png"},
        {"ind":"kakek","ter":"tete","img":"https://img.freepik.com/premium-psd/3d-grandfather-cartoon-character-icon-transparent-background_220739-74495.jpg"},
        {"ind":"nenek","ter":"nene","img":"https://png.pngtree.com/png-clipart/20241105/original/pngtree-smiling-cartoon-granny-clipart-illustration-png-image_16683697.png"},
        {"ind":"suami","ter":"suami","img":"https://img.freepik.com/foto-premium/ilustrasi-3d-karakter-kartun-dengan-komputer-di-sebuah-kafe_1057-129713.jpg"},
        {"ind":"istri","ter":"istri","img":"https://assets.kompasiana.com/items/album/2024/03/11/screenshot-2024-03-11-15-23-52-57-40deb401b9ffe8e1df2f1cc5ba480b12-65eec2f0de948f0b8a670a05.jpg"},
        {"ind":"paman","ter":"om","img":"https://img.freepik.com/foto-premium/pengusaha-kartun-bahagia-mengenakan-setelan-jas_1410957-55143.jpg"},
        {"ind":"bibi","ter":"tante","img":"https://png.pngtree.com/png-clipart/20240630/original/pngtree-a-smart-female-girl-using-mobile-phone-3d-style-white-background-png-image_15449656.png"},
        {"ind":"sepupu","ter":"sepupu","img":"https://png.pngtree.com/png-clipart/20240917/original/pngtree-3d-illustration-of-a-cute-cartoon-boy-in-doctor-uniform-png-image_16031583.png"},
        {"ind":"cucu","ter":"cucu","img":"https://img.freepik.com/foto-gratis/potret-3d-bayi-laki-laki-kartun-yang-menggemaskan_23-2151735024.jpg"},
        {"ind":"mertua","ter":"mertua","img":"https://img.pikbest.com/png-images/20250225/happy-muslim-couple-3d-cartoon-character_11555574.png!w700wp"},
        {"ind":"menantu","ter":"menantu","img":"https://i.pinimg.com/736x/a0/38/f6/a038f6eb6bc809b3f70938d09f8f9edc.jpg"},
        {"ind":"keluarga","ter":"keluarga","img":"https://cdn.pixabay.com/photo/2023/11/10/18/11/ai-generated-8379860_1280.png"},
        {"ind":"saudara","ter":"hira sebira","img":"https://img.freepik.com/premium-photo/3d-cute-cartoon-girl-studying-education-illustration_988987-2924.jpg"}
      ],
      "Tubuh": [
        {"ind":"kepala","ter":"ulu","img":"https://i.pinimg.com/1200x/01/a5/d6/01a5d647b20221ae14f12b5b7dc40873.jpg"},
        {"ind":"dahi","ter":"dahi","img":"https://imgix2.ruangguru.com/assets/miscellaneous/png_uy82af_5078.png"},
        {"ind":"badan","ter":"badan","img":"https://sekarciptaningtyas.wordpress.com/wp-content/uploads/2013/06/bagiantubuhkitabmsd-1.jpg?w=640"},
        {"ind":"tangan","ter":"tangan","img":"https://w1.pngwing.com/pngs/504/619/png-transparent-boy-thumb-arm-sleeve-hand-biceps-muscle-muscles-of-the-hand.png"},
        {"ind":"kaki","ter":"kaki","img":"https://st3.depositphotos.com/2398103/37315/v/1600/depositphotos_373152926-stock-illustration-vector-illustration-human-foot-cartoon.jpg"},
        {"ind":"mata","ter":"mata","img":"img/mata.png"},
        {"ind":"telinga","ter":"telinga","img":"img/telinga.png"},
        {"ind":"hidung","ter":"ilong","img":"img/hidung.png"},
        {"ind":"mulut","ter":"nganga","img":"img/mulut.png"},
        {"ind":"gigi","ter":"ing","img":"img/gigi.png"},
        {"ind":"lidah","ter":"ilong","img":"img/lidah.png"},
        {"ind":"pipi","ter":"pongo-pongo","img":"https://imgix2.ruangguru.com/assets/miscellaneous/png_czjjip_2954.png"},
        {"ind":"dagu","ter":"dagu","img":"https://png.pngtree.com/png-vector/20191123/ourlarge/pngtree-chin-plastic-correction-icon-cartoon-style-png-image_2007452.jpg"},        
        {"ind":"rambut","ter":"rambut","img":"img/rambut.png"},
        {"ind":"alis","ter":"kening","img":"https://media.istockphoto.com/id/1049761330/id/vektor/alis-berbentuk-sempurna-make-up-permanen-dan-tato-kosmetik-untuk-alis.jpg?s=612x612&w=0&k=20&c=4PoBRm2RK-Y0FxqYQ_L4B1vP5aWpwRLT_Kg440Ezu3U="},       
        {"ind":"bulu mata","ter":"bulu mata","img":"https://media.istockphoto.com/id/1149110843/id/vektor/bulu-mata-dan-logo-vektor-alis.jpg?s=612x612&w=0&k=20&c=t-0kpRchf7snCZgSqvm_Y7PXdCrUl9wADVrSuSlXs7w="},
        {"ind":"leher","ter":"gulu","img":"img/leher.png"},        
        {"ind":"perut","ter":"weteng","img":"https://i.pinimg.com/736x/ac/ee/c9/aceec9bfd98e0ccf36b011fcf618237e.jpg"},
        {"ind":"punggung","ter":"punggung","img":"https://media.istockphoto.com/id/1485990990/id/vektor/wanita-merasakan-sakit-leher-dan-punggung-penyakit-tulang-belakang-osteochondrosis-perawatan.jpg?s=612x612&w=0&k=20&c=U7P7XGQhhGiq6ffDV3KxU4P2XiTZ50Ai2IpiSI_Tx-g="},
        {"ind":"dada","ter":"dada","img":"https://st4.depositphotos.com/13264288/22130/v/1600/depositphotos_221303636-stock-illustration-young-man-feeling-chest-pain.jpg"},
        {"ind":"bahu","ter":"bahu","img":"https://imgix2.ruangguru.com/assets/miscellaneous/png_dr0r11_7863.png"},
        {"ind":"lutut","ter":"lutut","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdFr7ooR1xLFvQVCRQlU3O9CUS3ejlC3WAHuDil0VrYznIArSXSjVxxK-qMoH1-VSjE_s&usqp=CAU"},
        {"ind":"siku","ter":"siku","img":"https://png.pngtree.com/png-clipart/20220114/ourmid/pngtree-schematic-diagram-of-gout-limb-elbow-png-image_4185360.png"},
        {"ind":"telapak tangan","ter":" telapak tangan","img":"https://i.pinimg.com/474x/7c/89/a2/7c89a21e453983f7c795cba558e5370f.jpg"},      
        {"ind":"telapak kaki","ter":"telapak kaki","img":"https://st4.depositphotos.com/6660138/19774/v/450/depositphotos_197740904-stock-illustration-human-foot-icon-cartoon-style.jpg"},
        {"ind":"kuku","ter":"kuku","img":"https://media.istockphoto.com/id/168736443/id/vektor/bentuk-kuku.jpg?s=612x612&w=0&k=20&c=i4-s699ajejK8ma5eJCLiU-wEw7TUF3L-WBavxwP8so="},
        {"ind":"jari tangan","ter":"jari","img":"https://previews.123rf.com/images/iimages/iimages1609/iimages160900039/62887222-human-hands-left-and-right-illustration.jpg"},
        {"ind":"jari kaki","ter":"jari","img":"img/jari_kaki.png"},
        {"ind":"jantung","ter":"jantung","img":"https://thumb.viva.id/intipseleb/663x372/2022/06/28/62ba8b9875e01-sakit-jantung-ilustrasi.jpg"},
        {"ind":"otak","ter":"otak","img":"https://cdn.kibrispdr.org/data/477/gambar-otak-animasi-25.jpg"},
        {"ind":"tulang","ter":"tulang","img":"https://img.lovepik.com/png/20231018/x-ray-clipart-yellow-haired-child-bone-cartoon-bones_250844_wh860.png"},
        {"ind":"darah","ter":"getih","img":"https://media.istockphoto.com/id/1264055086/id/vektor/donor-darah-tangan-dengan-konsep-transfusi-darah-dalam-ilustrasi-kartun-vektor-terisolasi.jpg?s=612x612&w=0&k=20&c=bGI1eRA-NKyd8xtb28v1Po6SaQCEP1uopfueiL3FBY4="},
        {"ind":"otot","ter":"otot","img":"https://w7.pngwing.com/pngs/212/329/png-transparent-flexing-arm-muscles-sticker-arms-thumb-muscle-a-powerful-arm-mammal-carnivoran-hand.png"},
        {"ind":"kulit","ter":"kulit","img":"https://img.freepik.com/vektor-premium/konsep-perawatan-jerawat-wanita-tanpa-masalah-kulit-tanpa-jerawat-wajah-bersih-dan-jernih-ilustrasi-kartun-vektor-datar_77116-2315.jpg"},
        {"ind":"tulang rusuk","ter":"tulang rusuk","img":"https://cdn.kibrispdr.org/data/575/gambar-tulang-rusuk-dan-dada-56.jpg"},
        {"ind":"usus","ter":"usus","img":"https://cdn.grid.id/crop/0x0:0x0/700x465/photo/2022/06/13/contoh-gangguan-pada-sistem-penc-20220613095150.jpg"},
        {"ind":"paru-paru","ter":"paru-paru","img":"https://cdn.kibrispdr.org/data/481/gambar-paru-paru-animasi-44.jpg"},
        {"ind":"hati","ter":"hati","img":"https://media.istockphoto.com/id/1013086226/vector/healthy-liver-internal-human-organ-illustration.jpg?s=612x612&w=is&k=20&c=kGt6nT4RzMhQL2SdAW8zOtzWetsl4mlURckNqO-jHVc="},
        {"ind":"ginjal","ter":"ginjal","img":"https://media.istockphoto.com/id/824687130/id/vektor/kartun-ginjal-manusia.jpg?s=1024x1024&w=is&k=20&c=Vd9oPUaMNW-d4eyn01AhXgkmr28mEW1hu-19f6xA_G0="},
        {"ind":"lambung","ter":"lambung","img":"https://cdn.linkumkm.id/uploads/library/8/6/1/0/1/86101_840x576.jpg"},
        {"ind":"ekor","ter":" ekor","img":"https://thumbs.dreamstime.com/b/old-man-backache-bones-spine-old-man-backache-bones-spine-medical-care-red-spot-skeleton-sad-character-cane-228153992.jpg"},
        {"ind":"paha","ter":" paha","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA6QJgRFVjfLRXu2QOIUNfNjgjGDSImnXvpg&s"},
        {"ind":"betis","ter":" betis","img":"https://cdn.abcteach.com/abcteach-content-free/docs/free_preview/c/calfrgb_p.png"},
        {"ind":"lengan","ter":" lengan","img":"https://w1.pngwing.com/pngs/504/619/png-transparent-boy-thumb-arm-sleeve-hand-biceps-muscle-muscles-of-the-hand.png"}            
      ],
      "Tempat": [
        {"ind":"rumah","ter":"omah","img":"https://png.pngtree.com/png-clipart/20250811/original/pngtree-charming-cartoon-house-with-red-roof-and-green-trees-isolated-on-png-image_21718449.png"},
        {"ind":"sekolah","ter":"sekolah","img":"https://img.pikbest.com/illustration/20241222/a-colorful-cartoon-school-building-with-a-playground_11289214.jpg!w700wp"},
        {"ind":"kantor","ter":"kantor","img":"https://lh5.googleusercontent.com/proxy/-mdbKICq4ZgR5eoxcHqz6JovCDL0QGyNfwhYqEHYuMWa3PoCkaXwIu5xwSP3caM-vuQw5u6VivnOCWiz0kKxcrG1-WZbxwiHWmHUzN72E9OKTl5XfmyM"},
        {"ind":"pasar","ter":"pasar","img":"https://st2.depositphotos.com/25067502/49278/v/1600/depositphotos_492781278-stock-illustration-organic-food-market-street-people.jpg"},
        {"ind":"toko","ter":"toko","img":"https://www.gamelab.id/uploads/modules/NEWS/345/ritel.png?1606465422560"},
        {"ind":"restoran","ter":"restoran","img":"https://previews.123rf.com/images/denayunebgt/denayunebgt2210/denayunebgt221000819/193230467-italian-food-restaurant-or-cafeteria-with-people-eating-traditional-italy-dishes-pizza-or-pasta-in.jpg"},
        {"ind":"rumah sakit","ter":"rumah sakit","img":"https://pic.pikbest.com/02/18/68/49F888piCfwA.jpg!bw700"},
        {"ind":"masjid","ter":"masjid","img":"https://media.istockphoto.com/id/693541694/id/vektor/kartun-anak-anak-bahagia-merayakan-idul-fitri-di-taman-bersama-masjid.jpg?s=612x612&w=0&k=20&c=bvUFH_ruEp1ds_z0Yc_vVbTQkJYSfN4kpqhDWocCMz8="},
        {"ind":"gereja","ter":"greja","img":"https://i.pinimg.com/474x/20/7c/4e/207c4e0e733e88934cd57f0eebbfdd57.jpg"},
        {"ind":"pura","ter":"pura","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgUruaObjafzbkSWMy_muXEymeutAb4bdyQ1-zXd__hJWmZb4uWl0sWxqXK0ffvoJmjDM&usqp=CAU"},
        {"ind":"klinik","ter":"klinik","img":"https://pic.pikbest.com/02/18/94/99J888piCVdK.jpg!bw700"},
        {"ind":"hotel","ter":"hotel","img":"https://preview.free3d.com/img/2013/06/1749539764182189941/am39a7t8.jpg"},
        {"ind":"bandara","ter":"bandara","img":"https://png.pngtree.com/png-vector/20220429/ourlarge/pngtree-cartoon-airport-with-plane-and-control-tower-terminal-aviation-complex-vector-png-image_30166096.jpg"},
        {"ind":"stasiun","ter":"stasiun","img":"https://st2.depositphotos.com/1037238/6391/v/950/depositphotos_63913985-stock-illustration-people-waiting-in-a-train.jpg"},
        {"ind":"terminal","ter":"terminal","img":"https://www.shutterstock.com/image-vector/people-public-transport-bus-station-260nw-2281504547.jpg"},
        {"ind":"pelabuhan","ter":"pelabuhan","img":"https://panel.bekesah.co/storage/wp-content/uploads/2020/05/kapal-pelabuhan-lok-tuan.jpg"},
        {"ind":"taman","ter":"taman","img":"https://st2.depositphotos.com/1765462/10919/v/950/depositphotos_109195434-stock-illustration-park-playground-background.jpg"},
        {"ind":"lapangan","ter":"lapangan","img":"https://st4.depositphotos.com/5665934/39678/v/1600/depositphotos_396787110-stock-illustration-boys-kids-playing-soccer-ball.jpg"},
        {"ind":"jalan","ter":"dalane","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbsb5eSOyddZOCL9J4U0hfvKQM-neL1KEAIQ&s"},
        {"ind":"jembatan","ter":"jembatan","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1AgduVyzWz726vSh6md1PGa39aaujntlN-4te72oyC0kNKAwXvXGrmGaAwaiy6uoQ7fs&usqp=CAU"},
        {"ind":"kamar mandi","ter":"toilet","img":"https://st3.depositphotos.com/9129706/18862/v/1600/depositphotos_188621346-stock-illustration-cartoon-bathroom-interior-with-furniture.jpg"},
        {"ind":"perpustakaan","ter":"perpustakaan","img":"https://i.pinimg.com/originals/9b/23/38/9b2338248428f7d68ed9566346f3777a.jpg"},
        {"ind":"pantai","ter":"pantai","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHEZ3m_b594Sgzj4oelCDrWZMiIAPwmgi4uU2ASbx_4-D6vweUX2CRh0DtW0eLaFdPSxY&usqp=CAU"},
        {"ind":"gunung","ter":"gunung","img":"https://i.pinimg.com/736x/19/01/54/1901541be49dc273c2a61348d4cc9995.jpg"},
        {"ind":"museum","ter":"museum","img":"https://st3.depositphotos.com/25067502/32712/v/1600/depositphotos_327124008-stock-illustration-museum-art-gallery-people-vector.jpg"},
        {"ind":"bioskop","ter":"bioskop","img":"https://media.istockphoto.com/id/832124914/id/vektor/bioskop-menonton-bioskop-template-layar-kosong.jpg?s=1024x1024&w=is&k=20&c=sBdAA6N3NjpjZfmG-emeX4G3K4Zmpz_vyG_TYSi4tdI="},
        {"ind":"kolam renang","ter":"kolam renang","img":"https://media.istockphoto.com/id/1496296694/vector/swimming-pool-vector-illustration-with-summer-vacation-landscape-concept-and-kids-swim.jpg?s=612x612&w=is&k=20&c=agYhDEv1S-1KEqF8ToGob8cdRabnlrhsK6kRccLN9g8="}
      ],
      "Alam": [
        {"ind":"gunung","ter":"gunung","img":"https://i.ytimg.com/vi/rjrKGmFktL4/maxresdefault.jpg"},
        {"ind":"bukit","ter":"dawuhan","img":"https://plus.unsplash.com/premium_vector-1720507938681-7d683d11f3a2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
        {"ind":"lembah","ter":"lembah","img":"https://media.istockphoto.com/id/1425644881/id/vektor/ilustrasi-vektor-gunung-yang-indah-lanskap-lembah-kartun-dengan-sungai-pohon-batu-bunga-bukit.jpg?s=170667a&w=0&k=20&c=pw9fuaJ7GEad7xuBIyVBC2LKNCnIs03gqrVcqLyOoxk="},
        {"ind":"sungai","ter":"kali","img":"https://img.pikbest.com/illustration/20250101/river-scene-with-waterfall-and-fish_11331178.jpg!f305cw"},
        {"ind":"laut","ter":"segara","img":"https://media.istockphoto.com/id/502584197/id/vektor/gaya-kartun-kapal-di-laut-dan-ikan-yang-menyenangkan.jpg?s=1024x1024&w=is&k=20&c=Mwjrm2hGjA3_wfHexhXV4Y8rC1CX_gGw6Lb9s62s1fE="},
        {"ind":"danau","ter":"danu","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd2YZLqs72hG06Qyo00CvZCLPWjF4aIJhX-M6McNtyxYx6OYNUrckBl8exUBzrtowXfy4&usqp=CAU"},
        {"ind":"hutan","ter":"alas","img":"https://png.pngtree.com/thumb_back/fh260/background/20230315/pngtree-forest-path-cartoon-background-image_1948359.jpg"},
        {"ind":"pantai","ter":"pantai","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmlCvw54wUoPmn1SDvL_5HLS3FSJ52w2Pxj0RWI1NEbce9r8HQ61oJnLhPOfjYXqbZqB0&usqp=CAU"},
        {"ind":"langit","ter":"langit","img":"https://png.pngtree.com/background/20230420/original/pngtree-natural-animation-white-clouds-blue-sky-picture-image_2448755.jpg"},
        {"ind":"bintang","ter":"lintang","img":"https://i.pinimg.com/736x/9d/2b/36/9d2b36d58ebfca5f6c022295428fe912.jpg"},
        {"ind":"bulan","ter":"wulan","img":"https://img.pikbest.com/illustration/20241002/a-anime-alone-women-wear-gown-enjoying-at-moonlight-night-view-ai-generated-image_10917439.jpg!sw800"},
        {"ind":"matahari","ter":"srengenge","img":"https://static.vecteezy.com/system/resources/previews/000/521/795/non_2x/a-boy-watching-the-sunset-at-the-riverbank-vector.jpg"},
        {"ind":"awan","ter":"mega","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRka8qVduNDc8ka9MOnXfE5cOZIkOIiBWkYgetnZEZJ-myWSNrSCwtC64lz8iJvRNnHYjk&usqp=CAU"},
        {"ind":"hujan","ter":"udan","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNJCZDtksT-5TaH8tWWJiiDD4Wvj-HpRDuO-MhAxesDL8uWC_n623Wa6i9TX6wgmsjN5Q&usqp=CAU"},
        {"ind":"salju","ter":"salju","img":"https://pic.pikbest.com/02/22/82/05I888piCTsc.jpg!bw700"},
        {"ind":"petir","ter":"guntur","img":"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ee58c196-e10a-4197-88b5-b0a9d4ea1215/d1whms0-a6e83628-130d-4b3e-a6f7-7867629f3e06.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2VlNThjMTk2LWUxMGEtNDE5Ny04OGI1LWIwYTlkNGVhMTIxNVwvZDF3aG1zMC1hNmU4MzYyOC0xMzBkLTRiM2UtYTZmNy03ODY3NjI5ZjNlMDYuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.NQMvC_HXZmpvonSsA-pdLz_y2fQTOpWziHNlvCb9Da0"},
        {"ind":"pelangi","ter":"pelangi","img":"https://png.pngtree.com/thumb_back/fw800/background/20241210/pngtree-a-3d-cartoon-style-rainbow-on-beautiful-landscape-image_16738428.jpg"},
        {"ind":"angin","ter":"angin","img":"https://img.harianjogja.com/posts/2025/03/23/1208033/bencana-freepik.jpg"},
        {"ind":"kabut","ter":"kabut","img":"https://png.pngtree.com/background/20250125/original/pngtree-man-walking-through-a-foggy-forest-picture-image_15935296.jpg"},        
        {"ind":"polusi","ter":"polusi","img":"https://media.istockphoto.com/id/1187574448/id/vektor/polusi-udara-dengan-anak-anak-di-kota.jpg?s=170667a&w=0&k=20&c=NZeb3__7wryRlLESpScm8836mjYzWev9kEzUBcbAziA="},
        {"ind":"gunung berapi","ter":"gunung geni","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpsj_00ldcREWuXkBUA2blw29QWEo3SWAOB2CRrCPGtepRfQv5CVa0EIvnrF6y606XtuU&usqp=CAU"},
        {"ind":"air terjun","ter":"curug","img":"https://img.freepik.com/vektor-premium/latar-belakang-air-terjun-ilustrasi-indah-yang-menangkap-keindahan-air-terjun-yang-mengalir_198565-8064.jpg"},
        {"ind":"padang rumput","ter":"padang suket","img":"https://img.lovepik.com/photo/40129/3677.jpg_wh860.jpg"},
        {"ind":"gurun","ter":"gurun","img":"https://img.lovepik.com/photo/40007/7524.jpg_wh860.jpg"}
      ],
      "Hewan": [
        {"ind":"kucing","ter":"kucing","img":"https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/03/06082237/kucing-domestik.jpg"},        
        {"ind":"anjing","ter":"asu","img":"https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2021/08/20065849/Ini-X-Gangguan-Kesehatan-yang-Umumnya-Dialami-Anjing-Golden.jpg.webp"},
        {"ind":"burung","ter":"manuk","img":"https://asset.kompas.com/crops/CuREXFE9aBNsZ5ItbJb_VwPP8Q0=/0x0:1000x667/1200x800/data/photo/2022/07/26/62dfce0acaeaa.jpg"},
        {"ind":"ikan","ter":"iwak","img":"https://cdn.rri.co.id/berita/Cirebon/o/1725425715188-6513cccbe1a45/iajx9pf5ezaet8v.png"},
        {"ind":"ayam","ter":"pitik","img":"https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,f_auto,q_auto:best,w_640/v1634025439/79068f7851f61f80697295d0fdf1abcace4d34b0d25eb4c68e300da2a50e37de.jpg"},
        {"ind":"sapi","ter":"sapi","img":"https://unair.ac.id/wp-content/uploads/2022/04/Foto-by-Dunia-Sapi.jpg"},
        {"ind":"kuda","ter":"jaran","img":"https://www.batamnews.co.id/foto_berita//83kuda.jpg"},
        {"ind":"domba","ter":"wedhus","img":"https://awsimages.detik.net.id/community/media/visual/2024/06/07/177426993_169.jpeg?w=600&q=90"},
        {"ind":"kambing","ter":"kambing","img":"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hausziege_04.jpg/960px-Hausziege_04.jpg"},
        {"ind":"kerbau","ter":"kerbau","img":"https://cdn.grid.id/crop/0x0:0x0/x/photo/2022/11/14/perbedaan-hewan-kerbau-dan-bante-20221114032702.jpg"},
        {"ind":"biawak","ter":"biawak","img":"https://image.idntimes.com/post/20250106/202306-varanus-komodoensis-df50788dcc3c7a7a2e797148af184b7b-4bd21075cfdc8d0c46069f35b80b09cd.jpg"},
        {"ind":"ayam hutan","ter":"ayam alas","img":"https://api.ternakhias.com/public/images/b49c88af7ca84ba7957e411f64f3bd8f.webp"},
        {"ind":"merpati","ter":"merpati","img":"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Rock_Pigeon_Columba_livia.jpg/1024px-Rock_Pigeon_Columba_livia.jpg"},     
        {"ind":"elang","ter":"elang","img":"https://cdn.rri.co.id/berita/Fak_Fak/t/1730175449502-elang/7yq20ujyho4dixy.jpeg"},
        {"ind":"burung hantu","ter":"manuk hantu","img":"https://cdn.grid.id/crop/0x0:0x0/780x800/photo/bobofoto/original/17816_5-fakta-seputar-burung-hantu.jpg"},
        {"ind":"cendrawasih","ter":"cendrawasih","img":"https://westpapuavoice.ac/wp-content/uploads/2024/04/Cendrawaasih.png"},
        {"ind":"tikus","ter":"tikus","img":"https://d1bpj0tv6vfxyp.cloudfront.net/articles/a98d6280-5481-4a81-8926-cdfa2d8dbf9e_article_image_url.webp"},
        {"ind":"kelinci","ter":"kelinci","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgdwtaSj-2RMCoA7rcmiUY7YR139ORsrGDCQ&s"},
        {"ind":"babi hutan","ter":"babi alas","img":"https://asset.kompas.com/crops/DTyXmmHJt6wI9vvoyYhQOTzBrVU=/0x0:1900x1267/1200x800/data/photo/2019/09/23/5d88f725e2645.jpg"},
        {"ind":"babi","ter":"babi","img":"https://i0.wp.com/thepatriots.asia/wp-content/uploads/babiii.jpeg?fit=1536%2C873&ssl=1"},
        {"ind":"gajah","ter":"gajah","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3TPemPKbTWnrF8eXCC8tYDhWyu2AhZ2QwQPA58h_GTJ1YdKG3EJCotcG9KmkSPVD_b7o&usqp=CAU"},
        {"ind":"harimau","ter":"macan","img":"https://bskdn.kemendagri.go.id/website/wp-content/uploads/2018/03/Harimau-800x400.jpg"},
        {"ind":"singa","ter":"singa","img":"https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/78/2025/04/17/african-lion-portrait-warm-light-1551011717.jpg"},
        {"ind":"beruang","ter":"beruang","img":"https://assets.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p3/93/2024/07/06/4-fakta-menarik-beruang-coklat-himalaya-bisa-hibernasi-sampai-8-bulan-9VBXSAXQwf-1665841611.jpg"},
        {"ind":"zebra","ter":"zebra","img":"https://www.treehugger.com/thmb/qFhPReYPPaVgTtHBOthYeMJVeZ0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1043597638-49acd69677d7442588c1d8930d298a59.jpg"},
        {"ind":"jerapah","ter":"jerapah","img":"https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Giraffe-solo_Koure-NIGER.jpg/250px-Giraffe-solo_Koure-NIGER.jpg"},
        {"ind":"monyet","ter":"monyet","img":"https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg/250px-Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg"},
        {"ind":"ular","ter":"ular","img":"https://cdn1-production-images-kly.akamaized.net/9EJv_IFyChogvFuQTNQwUc6UReA=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1809016/original/084250100_1513849626-Snakes.jpg"},
        {"ind":"katak","ter":"kodok","img":"https://blog.kliknclean.com/wp-content/uploads/1-34.jpg"},
        {"ind":"kupu-kupu","ter":"kupu-kupu","img":"https://assets-a1.kompasiana.com/items/album/2016/08/09/kupu-kupu-57a95a61b17a61520786ca96.jpg"},
        {"ind":"lebah","ter":"tawon","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCypxkMNggvCdeLGSz9ZqpWNXkM-a6-Us9og&s"},
        {"ind":"semut","ter":"semut","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLNTtc4qdS77oDfx0JZGyDw6oF3jou_sx_Qg&s"},
        {"ind":"nyamuk","ter":"nyamuk","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRun5eCPGk_civCO4cJ-u4Bxz_PEiyqdlXWOYkGFLCKk3ZO6StAEHvF7EfEpOx71t5Afco&usqp=CAU"},
        {"ind":"laba-laba","ter":"laba-laba","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGrMXdr6NmUZZKcCJ4xZ0voMIbdELTVDDjmQvY1C8rZUFGMxyIunMp_5cvumQzNlMDHu0&usqp=CAU"},
        {"ind":"cacing","ter":"cacing","img":"https://res.cloudinary.com/dk0z4ums3/image/upload/v1649637870/attached_image/cacing-tanah-sebagai-obat-alami-dan-indikator-polusi.jpg"},
        {"ind":"kepiting","ter":"kepiting","img":"https://unair.ac.id/wp-content/uploads/2022/07/Foto-by-Grid-Kids.jpg"},
        {"ind":"udang","ter":"udang","img":"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Pandalus_borealis_Hakkeijima.jpg/2560px-Pandalus_borealis_Hakkeijima.jpg"},
        {"ind":"lobster","ter":"lobster","img":"https://res.cloudinary.com/aenetworks/image/upload/c_fill,ar_2,w_3840,h_1920,g_auto/dpr_auto/f_auto/q_auto:eco/v1/gettyimages-1262274470?_a=BAVAZGDX0"},
        {"ind":"gurita","ter":"gurita","img":"https://c.files.bbci.co.uk/8073/production/_122238823_1920xgettyimages-1136409408.jpg"},
        {"ind":"hiu","ter":"hiu","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUzUPIMKevrhm4P_LJ6VXa8UK1s1TO_dxeBQ&s"},
        {"ind":"paus","ter":"paus","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgi6PDPBkU7_I2yZau2Lk3kVadYRmuuZcqbQ&s"},
        {"ind":"lumba-lumba","ter":"lumba-lumba","img":"https://www.faunadanflora.com/wp-content/uploads/2016/07/lumba-lumba-hidung-botol.png"}, 
        {"ind":"penyu","ter":"penyu","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5654cbh7ThvwcwOjCw2Ptps66KTUqPAOugw&s"},
        {"ind":"kuda laut","ter":"kuda laut","img":"https://cdn.grid.id/crop/0x0:0x0/x/photo/2021/10/21/pexels-sergiu-iacob-7868382jpg-20211021021945.jpg"},
        {"ind":"bintang laut","ter":"bintang laut","img":"https://asset.kompas.com/crops/0QuehL22Sii0l8YTbuTlhCXEsIA=/252x127:1779x1146/1200x800/data/photo/2022/09/30/63369d9620270.jpg"},
        {"ind":"belut","ter":"belut","img":"https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//100/MTA-53397136/no_brand_belut_baluik_sawah_besar_hidup_500gr_ikan_segar_rak_sayur_padang_full01_s3bw1yma.jpg"},
        {"ind":"tuna","ter":"tuna","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2WgAefaMmxzsrAdy57RBK2fir8EeDXNndNg&s"},
        {"ind":"cumi-cumi","ter":"cumi-cumi","img":"https://rumahpengetahuan.web.id/wp-content/uploads/2021/11/cumi-cumi.jpg"},
        {"ind":"kerang","ter":"kerang","img":"https://media.istockphoto.com/id/672140014/id/foto/cangkang-kerang-dalam-gelombang.jpg?s=612x612&w=0&k=20&c=4nuC1rQ29KWdcXvvzTOLfz5yvXkgdsgQlnM5fMVEJoU="}
      ],  
      "Buah-Buahan": [
        {"ind":"apel","ter":"apel","img":"https://www.balipost.com/wp-content/uploads/2017/12/balipostcom_makan-apel-setiap-hari-ini-10-manfaatnya_01-696x464.jpg"},
        {"ind":"pisang","ter":"gedhang","img":"https://www.astronauts.id/blog/wp-content/uploads/2023/02/Kenali-Ciri-Buah-Pisang-Matang.jpg"},
        {"ind":"jeruk","ter":"jeruk","img":"https://mmc.tirto.id/image/2016/08/16/TIRTO-shutterstock_115590688_ratio-16x9.JPG"},
        {"ind":"jeruk limau","ter":"lemon nipis","img":"https://filebroker-cdn.lazada.co.id/kf/Sf4c187448e6a47acb1b1d8a33c9e1872a.jpg"},        
        {"ind":"mangga","ter":"mangga","img":"https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/255/2024/12/11/Screenshot-2024-12-11-144728-4103957776.png"},
        {"ind":"nanas","ter":"nanas","img":"https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/01/26025212/manfaat-rutin-konsumsi-buah-nanas-untuk-kolesterol-halodoc.jpg"},
        {"ind":"anggur","ter":"anggur","img":"https://lh7-rt.googleusercontent.com/docsz/AD_4nXcGkKtE7vERFheT7_9Lp2v1BF1SUOfcnmv2OrJgu-LYufhp-y-mrEWUnlgEbzltVOJq6UW3rU4ohK51-rIqUo6kzyr5iRdladXifbdnRevxqNBhf6if9A4dFVSeLwvHEF18ouMge4uCCcl37HZcoQZ4-yNy?key=s9Ui311zoyv7uLr6PYhGsxyE"},
        {"ind":"semangka","ter":"semangka","img":"https://pasarrakyatbali.com/cdn/shop/products/bua-020_750x.png?v=1590325301"},
        {"ind":"melon","ter":"melon","img":"https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/05/26052327/Tak-Hanya-Enak-Ini-X-Manfaat-Cantaloupe-Melon.jpg"},
        {"ind":"pepaya","ter":"pepaya","img":"https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/01/19025309/Ragam-Manfaat-Pepaya-California-yang-Jarang-Diketahui-01-1.jpg"},
        {"ind":"kiwi","ter":"kiwi","img":"https://i0.wp.com/ciputrahospital.com/wp-content/uploads/2025/04/manfaat-kiwi.jpeg?resize=1024%2C684&ssl=1"},
        {"ind":"stroberi","ter":"stroberi","img":"https://img-cdn.medkomtek.com/Eh3Actrj-UGZ0t9bMZUhIgZL9bI=/510x395/smart/filters:quality(100):format(webp)/article/KvLxdyamVtSuGuJnIa1v3/original/6z1tvri7mys050ng0ezr6o0a5a265fqr.jpg"},
        {"ind":"blueberry","ter":"blueberry","img":"https://www.bandirmabahcemarketi.com/img/products/blueberry-yaban-mersini-fidani-fidanlikcomtr_11.12.2022_82f0b32.jpg"},
        {"ind":"raspberry","ter":"raspberry","img":"https://mr-fothergills.co.uk/cdn/shop/collections/MRF_Raspberry_collection_banner.jpg?v=1691682859&width=2048"},
        {"ind":"blackberry","ter":"blackberry","img":"https://cdn.shopify.com/s/files/1/0059/8835/2052/products/Thornless_Blackberry_3.jpg?v=1612444137"},
        {"ind":"ceri","ter":"ceri","img":"https://oerban.com/wp-content/uploads/2022/06/IMG-20220615-WA0010.jpg"},
        {"ind":"pala","ter":"pala","img":"https://blog.umsu.ac.id/aktual/wp-content/uploads/2024/12/buah-pala.jpg"},
        {"ind":"delima","ter":"delima","img":"https://res.cloudinary.com/dk0z4ums3/image/upload/v1603089388/attached_image/4-manfaat-buah-delima-yang-perlu-kamu-tahu.jpg"},
        {"ind":"kurma","ter":"kurma","img":"https://phinemo.com/wp-content/uploads/2018/05/Manfaat-Buah-Kurma.jpg"},
        {"ind":"sirsak","ter":"sirsak","img":"https://i0.wp.com/raisa.aeonstore.id/wp-content/uploads/2023/08/203804.png?fit=1080%2C1080&ssl=1"},
        {"ind":"jambu biji","ter":"giawas","img":"https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/08/25045140/X-Khasiat-Jambu-Biji-Mampu-Redakan-Nyeri-Menstruasi.jpg"},
        {"ind":"jambu air","ter":"gora","img":"https://upload.wikimedia.org/wikipedia/commons/a/aa/Syzygium_samarangense_%28jamalac_ou_jambose%29.jpg"},
        {"ind":"manggis","ter":"manggis","img":"https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/08/25084854/Kandungan-Nutrisi-dalam-Manggis-untuk-Kesehatan.jpg"},
        {"ind":"rambutan","ter":"rambutan","img":"https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2024/11/29080523/Buah-Rambutan-Ini-Kandungan-Nutrisi-dan-Manfaatnya-untuk-Kesehatan.jpg"},
        {"ind":"salak","ter":"salak","img":"https://image.idntimes.com/post/20190212/salacca-zalacca-ss-94683151806945512801280-d6f147c8fa8350dd082833f7961e3c04.jpg"},
        {"ind":"sawo","ter":"sawo","img":"https://kabarjombang.com/wp-content/uploads/2023/02/buah-sawo.jpg"},
        {"ind":"kedondong","ter":"kedondong","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRDdxJK3QXUUfJkXSK2jBFCERXwPwX0E_3kw&s"},
        {"ind":"belimbing","ter":"belimbing","img":"https://cdn.grid.id/crop/0x0:0x0/780x800/photo/bobofoto/original/6611_foto-sehatmucom.jpg"},
        {"ind":"buah naga","ter":"buah naga","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGpFdCSkH9TnDXsCTcAOnAp9PxH79fwPbpEA&s"},
        {"ind":"markisa","ter":"markisa","img":"https://lapakbuah.com/wp-content/uploads/2021/07/Markisa-kuning.jpg"}, 
        {"ind":"lengkeng","ter":"lengkeng","img":"https://awsimages.detik.net.id/community/media/visual/2022/04/20/buah-kelengkeng_169.jpeg?w=600&q=90"},  
        {"ind":"avokad","ter":"avokad","img":"https://s3-ap-southeast-1.amazonaws.com/blog-assets.segari.id/2024/08/shutterstock_2424492393.jpg"},
        {"ind":"cempedak","ter":"cempedak","img":"https://fahum.umsu.ac.id/blog/wp-content/uploads/2024/09/manfaat-buah-cempedak-untuk-kesehatan-tubuh.jpg"},
        {"ind":"durian","ter":"durian","img":"https://www.chubb.com/content/dam/chubb-sites/chubb-com/id-id/lei-new-assets/images/article/manfaat-durian-featured.png"},
        {"ind":"buah tin","ter":"buah tin","img":"https://www.tanamanmart.com/wp-content/uploads/2022/02/TIN-UNGU-8.jpg"},
        {"ind":"buah zaitun","ter":"buah zaitun","img":"https://images.meesho.com/images/products/475720093/byxjl_512.webp?width=512"},
        {"ind":"kelapa","ter":"klapa","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFdWszFBTw_ZOdicz4xE80j7vk3mVWQ4ObTA&s"},
        {"ind":"kelapa tua","ter":"klapa tuwa","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2LYLQzdrb9aS9KlMNg9I-tDa3zHnrjgEphc07jVenVKNfrYQpcGPQ5Zhva5_roCfGnO8&usqp=CAU"},
        {"ind":"santol","ter":"santol","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgI7PfophYZcOdPK6_s0ADHKUovHv1cUmXMVtlqeKX-yn0KRewlur67YnBC-qLhKtwCWw&usqp=CAU"},
        {"ind":"asam jawa","ter":"asem jawa","img":"https://puskesmasmeninting-dikes.lombokbaratkab.go.id/media/crop/2025/04/30/57-20250430-231048-004763.jpg"},
      ],
      "Tumbuhan": [
        {"ind":"pohon","ter":"wit","img":"https://asset.kompas.com/crops/xj6vydUIRUnuf7_Zqr9MCeO73ig=/0x0:750x500/1200x800/data/photo/2021/04/26/608696cd6eb85.jpg"},
        {"ind":"bunga","ter":"kembang","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXcoZAUNQqfK9vtDNprAkkFQTzKQlFtwua2Q&s"},
        {"ind":"rumput","ter":"suket","img":"https://i0.wp.com/ciputrahospital.com/wp-content/uploads/2025/02/shutterstock_1907429110-1.jpg?resize=1024%2C768&ssl=1"},
        {"ind":"akar","ter":"oyot","img":"https://cdn1-production-images-kly.akamaized.net/TTNeJ_LFV5C0YO-sNo3fUcVSVWQ=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3981594/original/032990800_1648787088-eilis-garvey-MskbR8VLNrA-unsplash_1_.jpg"},
        {"ind":"batang","ter":"gagang","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSndZMzAXkyLRPZovoWVPZZ0iJWMytzNx2Gv8NJ29fw5Rs3Q6I3HiHSqjc5W_mksHh32oA&usqp=CAU"},
        {"ind":"buah","ter":"buah","img":"https://rsud.sulbarprov.go.id/wp-content/uploads/2025/07/gambar-buah.jpg"},
        {"ind":"padi","ter":"padi","img":"https://static.gatra.com/foldershared/images/2021/fek/11-Nov/SAVE_20211115_131656.jpg"},
        {"ind":"jagung","ter":"jagung","img":"https://asset.kompas.com/crops/PlvLsdLOdCpdpnxNP8N95kDVuBE=/0x43:1000x710/1200x800/data/photo/2022/09/22/632c01f18b16e.jpg"},
        {"ind":"kacang","ter":"kacang","img":"https://jambiindependent.bacakoran.co/upload/7f95e2fc6614cbdb8917035dfb607b7d.jpg"},
        {"ind":"tebu","ter":"tebu","img":"https://asset.kompas.com/crops/8g53Q5XJw1eCFp8Gt_1uuki17Yo=/0x0:1280x853/1200x800/data/photo/2022/10/10/6343aa104292c.jpg"},
        {"ind":"kelapa sawit","ter":"klapa sawit","img":"https://cms.gokomodo.com/wp-content/uploads/2022/12/Blog-banner-limbah-sawit.jpg"},
        {"ind":"karet","ter":"karet","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2oIp6MK5qBF_LiyFDx_UNx7wultAkpAe_5g&s"},
        {"ind":"kopi","ter":"kopi","img":"https://res.cloudinary.com/dk0z4ums3/image/upload/v1594099345/attached_image/ini-manfaat-konsumsi-kopi-hitam-dan-efek-sampingnya-untuk-kesehatan.jpg"},
        {"ind":"teh","ter":"teh","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgXXdtLvoLaZeS6oSBfY6EDgDAHxIWn2N5Pw&s"},
        {"ind":"coklat","ter":"coklat","img":"https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2023/02/14/826260024.jpg"},
        {"ind":"kapuk","ter":"kapuk","img":"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi6gL6pFwR-3tGynkOCGQYmC0AoxJ-W9mgb-20tA8iunb34b8Mm6z2ufwP4qowAynSqDJrIIfZfHNQV4Ci8Xdp5x2p1-W4CXbYujNZFeIp_tDsLfiFjKXd2fgkGaJcFji5YD0H1fr_FaUI/s1600/kapuk+IMG_4412aa.jpg"},
        {"ind":"kayu","ter":"kayu","img":"https://img.antarafoto.com/cache/1200x800/2025/05/15/produksi-kayu-hasil-hutan-perum-perhutani-jawa-timur-1i629-dom.jpg"},
        {"ind":"bambu","ter":"bambu","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVFyDnznm8E88XYb5lusW71d4-FsnJmhjumw&s"},
        {"ind":"singkong","ter":"singkong","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStuiizOrBo5ZiZOqSioeNpZ4VmmspHiwsP0g&s"},
        {"ind":"ubi","ter":"ubi","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa0-JmOonX_LsnrDx27ns4vDbg3d9q_3bE3A&s"},
        {"ind":"ubi ungu","ter":"ubi ungu","img":"https://cdn.grid.id/crop/0x0:0x0/x/photo/2022/12/02/ubi-ungujpg-20221202050632.jpg"},
        {"ind":"kentang","ter":"kentang","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeEBfP5ch843ga-O3kFjGZErQo7j3kverKqg&s"},
        {"ind":"wortel","ter":"wortel","img":"https://asset.kompas.com/crops/yvqeU6-KhlBlXVf5Zd05E9FfoQk=/0x0:1000x667/1200x800/data/photo/2024/01/24/65b084e61bb05.jpg"},
        {"ind":"bawang merah","ter":"bawang abang","img":"https://res.cloudinary.com/dk0z4ums3/image/upload/v1620032803/attached_image/selain-gurih-manfaat-bawang-merah-juga-banyak.jpg"},
        {"ind":"bawang putih","ter":"bawang putih","img":"https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/03/02060024/X-Manfaat-Bawang-Putih-untuk-Kesehatan-Anak-01.jpg"},
        {"ind":"cabai","ter":"cabe","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLMbL9mT2B9ka5HIYnioEBMgUojgVNMDQzjw&s"},
        {"ind":"cabai kecil","ter":"rica nona","img":"https://cdn.grid.id/crop/0x0:0x0/700x465/photo/2020/10/27/2453210438.jpg"},        
        {"ind":"tomat","ter":"tomat","img":"https://res.cloudinary.com/dk0z4ums3/image/upload/v1629681328/attached_image/9-manfaat-tomat-buah-yang-disangka-sayur.jpg"},
        {"ind":"talas","ter":"talas","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOgICRGWnIr1U8ouzZDwig_bN5vAYd1oQebQ&s"},
        {"ind":"bayam","ter":"bayem","img":"https://yoona.id/wp-content/uploads/2021/12/manfaat-daun-bayam.jpg"},
        {"ind":"kangkung","ter":"kangkung","img":"https://bbppkupang.bppsdmp.pertanian.go.id/storage/app/uploads/public/650/8e1/67b/6508e167be686855044774.jpg"},
        {"ind":"selada","ter":"selada","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUKd63RzsHRmL0W9IXQT32wbpcbWQO9JJzeA&s"},
        {"ind":"sawi","ter":"sawi","img":"https://i0.wp.com/resepkoki.id/wp-content/uploads/2018/02/sawi-hijau.jpg?fit=500%2C332&ssl=1"},
        {"ind":"kubis","ter":"kol","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIrkDI3rfOMLtXplb7d9MB9Ir7DIDxBiF_wWP9pq0wn9E8MKmgaagrvc_7Qc06wmMi9zo&usqp=CAU"},
        {"ind":"seledri","ter":"seledri","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy_jg_tDRVrYCdgLAQshhnL0RRRqtklRk0w76R8DmGkQ1TbBEL5yO1VSiPECJ_mEEP4Ww&usqp=CAU"},
        {"ind":"daun bawang","ter":"daun bawang","img":"https://radarselatan.bacakoran.co/upload/a962c32ee02d59fddc88533bbd2376b8.JPG"},
        {"ind":"ketumbar","ter":"ketumbar","img":"https://awsimages.detik.net.id/community/media/visual/2020/08/27/ketumbar-1_43.jpeg?w=600&q=90"},
        {"ind":"peterseli","ter":"peterseli","img":"https://res.cloudinary.com/dk0z4ums3/image/upload/v1726404791/attached_image/parsley-tanaman-herba-yang-bermanfaat-bagi-kesehatan.jpg"},
        {"ind":"daun mint","ter":"daun mint","img":"https://asset.kompas.com/crops/CYl2VsumCrNALjYW7oVheg98dD4=/50x52:626x436/1200x800/data/photo/2022/11/02/6362149ed83b9.jpg"},
        {"ind":"basil","ter":"basil","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7WHjUFmkGlf3Fe4fdXwGP8MOMuHQYVhb2cWfJU2bbxrYHHjoy6JIcsrsdCTKb6rmauEU&usqp=CAU"},
        {"ind":"lavender","ter":"lavender","img":"https://www.myseeds.co/cdn/shop/files/Lavender_Vera_TrueLavender_Lavandulaangustifolia_Herbs002_grande.jpg?v=1696865630"}
      ],
      "Makanan": [
        {"ind":"nasi","ter":"nasi","img":"https://iluminasi.com/img/thumb/banner-cara-masak-nasi-yang-paling-basic-dan-simple.jpg"},
        {"ind":"roti","ter":"roti","img":"https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480/img/recipe/ras/Assets/9469D8A3-4255-46AF-98ED-8E08E0DB59CA/Derivates/5e21d30d-3e69-4400-9663-0b9666019d0e.jpg"},
        {"ind":"telur","ter":"endhog","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS-5b5z7PyHcPVLEMF5yM54I4ZLJEU1Cy2Yw&s"},
        {"ind":"daging","ter":"daging","img":"https://cdn1-production-images-kly.akamaized.net/D9x_W1mMprscBJO-P0Aur1kTNik=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3133148/original/027517900_1589942784-Raw_Fresh_Meat_With_Rosemary.jpg"},
        {"ind":"ikan","ter":"iwak","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQODYYBfyEa0hZxxBtueUIIofCstlx4JrLBSw&s"},
        {"ind":"sayur","ter":"sayur","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVSLo2-3E4ZgOPWgUxRcc81_TbcZhq2MzjKQ&s"},
        {"ind":"susu","ter":"susu","img":"https://res.cloudinary.com/dk0z4ums3/image/upload/v1732948205/attached_image/susu-sapi-inilah-kandungan-nutrisi-dan-manfaatnya-bagi-kesehatan.jpg"},
        {"ind":"keju","ter":"keju","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-KV4Ec4JSx2THZZgtt35j2my5H2BNHR38tg&s"},
        {"ind":"mentega","ter":"mentega","img":"https://storage.googleapis.com/bakingworld-web-production/uploads/media/content_banner/b-mentega-cair-1756893161111.jpg"},
        {"ind":"minyak","ter":"minyak","img":"https://d12man5gwydfvl.cloudfront.net/wp-content/uploads/2022/01/olive-oil.jpg"},
        {"ind":"gula","ter":"gula","img":"https://www.prb.co.id/uploads/ngc_global_images/jenis-jenis-gula-52957-20240418114441.jpg"},
        {"ind":"garam","ter":"uyah","img":"https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/06/27031510/Ketahui-X-Jenis-Garam-dan-Manfaatnya-untuk-Kesehatan.jpg"},
        {"ind":"lada","ter":"lada","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQybVZlVfW37NYmgkGgqEnLYQ7hPIivTtk8Vw&s"},
        {"ind":"kecap","ter":"kecap","img":"https://almeganews.wordpress.com/wp-content/uploads/2022/08/1.jpg"},
        {"ind":"saus","ter":"saus","img":"https://asset-2.tribunnews.com/kupang/foto/bank/images/saus-sambal.jpg"},
        {"ind":"cuka","ter":"cuka","img":"https://img.lazcdn.com/g/p/9a835c634135b0369ee117d824ddefc5.jpg_720x720q80.jpg"},
        {"ind":"tepung","ter":"tepung","img":"https://s0.bukalapak.com/attachment/000232/merk_tepung_sagu_main_image.jpg"},
        {"ind":"mie","ter":"mi","img":"https://www.dapurkobe.co.id/wp-content/uploads/mie-pedas-udang-geprek.jpg"},
        {"ind":"bihun","ter":"bihun","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScrdpLvKC2NmhPkQ8hhbzmVf3FzE5EL15EUg&s"},
        {"ind":"sagu","ter":"sagu","img":"https://upload.wikimedia.org/wikipedia/id/d/d7/Sagu_lempeng.jpg"},
        {"ind":"tempe","ter":"tempe","img":"https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480/img/recipe/ras/Assets/a96dc8e08248133e3da0b011f533a5ae/Derivates/281033d21ee6f68fc14412a62302264d1e06c36d.jpg"},
        {"ind":"tahu","ter":"tahu","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEHs3orMjV7MR5KcdqtREW_C3F73lKI5R-rA&s"},
        {"ind":"sate","ter":"sate","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhvZZ9CtNx4kavEGjYNtl1mx--BvAveo9KfLIxDOXhparA07N2PCszR2aBcqTpBIkf5o4&usqp=CAU"},
        {"ind":"bakso","ter":"bakso","img":"https://awsimages.detik.net.id/community/media/visual/2019/08/12/dca21bf3-923c-486f-bc2e-a3dcd759b1df_43.jpeg?w=600&q=90"},
        {"ind":"nugget","ter":"nugget","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3sgXThPGwG4_DwNe0s5aeSCNMI2yF-MAe83G4t08Sn1pUhlQBosob_zbMaP6IpBq4EZA&usqp=CAU"},
        {"ind":"sosis","ter":"sosis","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv5iCbWZEM0fUD9d2VtsE_iyytje6ThMzScw&s"},
        {"ind":"burger","ter":"burger","img":"https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2021/09/beef-burger.jpg?im=AspectCrop=(16,9);"}
      ],
      "Budaya": [
        {"ind":"tarian","ter":"tari","img":"https://live.staticflickr.com/2844/34333614125_a4ccf441c0_b.jpg"},
        {"ind":"musik","ter":"musik","img":"https://indonesiakaya.com/wp-content/uploads/2020/10/arababu_1200.jpg"},
        {"ind":"adat","ter":"adat","img":"https://halmaherapost.com/wp-content/uploads/2022/02/IMG-20220219-WA0013.jpg"},
        {"ind":"kain tradisonal","ter":"kain tradisonal","img":"https://cdn.antaranews.com/cache/1200x800/2022/08/11/Batik-Tubo-khas-Malut.jpg"},
        {"ind":"pesta","ter":"pesta","img":"https://awsimages.detik.net.id/content/2013/03/25/1049/legugam.jpg"},
        {"ind":"upacara","ter":"upacara","img":"https://cdn.antaranews.com/cache/1200x800/2024/03/27/Kesultanan-Ternate-gelar-ritual-Kabasarang-Uci-ke-15-Ramadhan-2632024-ans-2.jpg"},
        {"ind":"tradisional","ter":"tradisional","img":"https://awsimages.detik.net.id/community/media/visual/2023/12/15/keindahan-anak-anak-di-timur-ri-menarikan-cakalele-9_169.jpeg?w=700&q=90"},
        {"ind":"lagu","ter":"lagu","img":"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjTOHmuEsdB6QH6wCBDpxNrZ5MGFBxfvHpV0kDv_GkdtoAFp6Lp-TjSg0GQ_l5z-pkjM0_cc7GHoeA1Lkibz19OVbdJr58G3Hi5I61_I_N3iuE5b255H4BfoW0s3EvEF5mRteAiCqvJPBE/w0/Bambu+Hitada.jpg"},
        {"ind":"alat musik","ter":"piranti musik","img":"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgiXtKc6fLqmeZ0wb1gDB64in2AEtOWxGpk7JUtaaE0ikBYhYZEY_KcoJGHSiudkbszFKbRHSs_ym4K1Z-aJy5Ks9LOI2pBRrpStpwRNF-owAThK_N8IUqi0b5Yo6Fw2Qawre9eQbOpAkc/s1600/Alat+Musik+Tradisional+Provinsi+Maluku+%2540+DTECHNOINDO.jpg"},
        {"ind":"pakaian adat","ter":"busana adat","img":"https://i.pinimg.com/474x/e4/67/ca/e467ca123059f886b687d8a4d8d8ab6c.jpg"},
        {"ind":"upacara adat","ter":"upacara adat","img":"https://fitinline.com/data/article/20140516/Maluku%20Utara%20003.jpg"},
        {"ind":"senjata tradisional","ter":"senjata tradisional","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk4NEushQB919i2ygfJUQLdtOvOnvtt8oSEQ&s"},
        {"ind":"rumah adat","ter":"omah adat","img":"https://asset.kompas.com/crops/5mtGK-4A-XAXb4kwp5yJ1MPSWko=/0x0:860x573/750x500/data/photo/2023/06/21/6492b9c2b51c6.jpg"},
        {"ind":"tugu","ter":"tugu","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtqfPTra9PMgLWJ8s76fij8waoW0dId6IuPA&s"},
        {"ind":"candi","ter":"candi","img":"https://torch.id/cdn/shop/articles/Artikel_173_-_Preview.webp?v=1713644561&width=1100"},
        {"ind":"keris","ter":"keris","img":"https://jendelakecildunia.com/wp-content/uploads/2018/01/EVY_5188.jpg"},
        {"ind":"batik","ter":"batik","img":"https://images.squarespace-cdn.com/content/v1/5af1298bfcf7fd60f31f66bd/1614565575916-YL8TYGEZ4SM7XR63LRE3/Maluku-03.png"},
        {"ind":"wayang","ter":"wayang","img":"https://mmc.tirto.id/image/otf/640x0/2021/06/09/antarafoto-festival-dalang-cilik-090621-hnd-2_ratio-16x9.jpg"}
      ],
      "Peralatan": [
        {"ind":"komputer","ter":"komputer","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9CPL3-zzDFh8cOxSywu0wNDRKKV8H1wKPzJdL1no8sAQ592UCgBwvKMegl534jpax188&usqp=CAU"},
        {"ind":"telepon","ter":"telepon","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyGoChGztqB-7DQdj8DhcDdyFufFStQl8FFQ&s"},
        {"ind":"handphone","ter":"hp","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj_ujYDQD-Yunlk_hcdn89cFDD1ymLs9JOOwzPej1yMDee3TO_6vk2kNpIw1k-MdWnBW0&usqp=CAU"},
        {"ind":"meja","ter":"meja","img":"https://smb-padiumkm-images-public-prod.oss-ap-southeast-5.aliyuncs.com/products/12712/87120/8.-meja-panjang.1611562981.png?x-oss-process=image/resize,m_pad,w_432,h_432/quality,Q_70"},
        {"ind":"kursi","ter":"kursi","img":"https://smb-padiumkm-images-public-prod.oss-ap-southeast-5.aliyuncs.com/products/27855/275373/meja-kursi-sisw.1625209715.jpg?x-oss-process=image/resize,m_pad,w_432,h_432/quality,Q_70"},
        {"ind":"lemari","ter":"lemari","img":"https://www.homarindo.com/wp-content/uploads/2025/01/Lemari-Pakaian-Sliding-3-Pintu-Minimalis-Modern.jpg"},
        {"ind":"tempat tidur","ter":"amben","img":"https://www.homarindo.com/wp-content/uploads/2024/08/Tempat-Tidur-Minimalis-Modern-Venia-1.jpg"},
        {"ind":"bantal","ter":"bantal","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlU0p9kS0WejdarkJc3q_pz1agKpUt3fmehg&s"},
        {"ind":"guling","ter":"guling","img":"https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//86/MTA-7440421/milkyway_milkyway_guling_tidur_-_white_full04_bqmp9umn.jpg"},
        {"ind":"selimut","ter":"selimut","img":"https://down-id.img.susercontent.com/file/id-11134207-7qukx-ljl74nwiniua11"},
        {"ind":"jam tangan","ter":"jam tangan","img":"https://migadget.id/wp-content/uploads/2021/02/Xiaomi-Mi-Watch-Smartwatch-Jam-Tangan-Xiaomi-Watch-5.jpg"},
        {"ind":"jam dinding","ter":"jam tembok","img":"https://snapy.co.id/gambar/artikel/article03_11_jam_dinding.jpg"},
        {"ind":"kulkas","ter":"kulkas","img":"https://lh7-us.googleusercontent.com/mahKNH6ij6A58GBlHe2QXCz_dMT6VjNnC7eZme46PZsdv2M3Wosvf3-SqCExkk5z_d5kwxm1AHmOgDFeOwuvDB7tt1yPwX89lJMZGfoiHplcXtBcNVBZ8QUEhHa-QqIQtAHpPwAoZeSVZvArGRwWurQ"},
        {"ind":"ac","ter":"ac","img":"https://www.abangbenerin.com/blog/wp-content/uploads/2021/08/room-air-conditioning-air-conditioner-remote-control-female-hands-scaled.jpg"},
        {"ind":"kipas angin","ter":"kipas angin","img":"https://store.cosmos.id/cdn/shop/files/16SAE-a.jpg?v=1756733706"},
        {"ind":"lampu","ter":"lampu","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk5NRukcql29buaGcU0q7_73fpl2tx1Oc-QP84ne0SjjCHQSzOsQ2i-Q-pQ40tY4ZJ3Ho&usqp=CAU"},
        {"ind":"televisi","ter":"televisi","img":"https://images.samsung.com/is/image/samsung/assets/id/explore/discover/tv-av/tv-4k/tv-4k-kv-mo.png?$720_N_PNG$"},
        {"ind":"mesin cuci","ter":"mesin cuci","img":"https://cdn.polytron.co.id/public-assets/polytroncoid/2024/12/PFL-1105-2-1080x1080.png"},
        {"ind":"setrika","ter":"setrika","img":"https://www.simplyfreshlaundry.com/wp-content/uploads/myinfo-asal-usul-dan-perkembangan-setrika-7979.jpg"},
        {"ind":"kompor","ter":"kompor","img":"https://hock.id/cdn/shop/products/KAL-22-MB-samping.jpg?v=1602872512"},
        {"ind":"oven","ter":"oven","img":"https://www.electriq.co.uk/Images/eiQ45LOVN_6_Supersize.jpg?v=10"},
        {"ind":"panci","ter":"panci","img":"ahttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZWkzhN42H8oDDGdMtHPbsQ5_rj96gr2sKQNf74KCU1g_ynqGd-hC_hQclWgP4sR1hCIg&usqp=CAU"},
        {"ind":"wajan","ter":"wajan","img":"https://images.tokopedia.net/img/cache/700/product-1/2019/9/5/1680725/1680725_dd56eb81-6ed4-4db0-9d78-2221c98be9a7_700_700.jpg"},
        {"ind":"dandang","ter":"dandang","img":"https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/112/MTA-169973752/orchid_orchid_panci_dandang_kukus_aluminuim_serbaguna_kuat_tebal_50-55-60_full01_f4e7390f.jpg"},
        {"ind":"sendok","ter":"sendok","img":"https://id-test-11.slatic.net/p/08daf9a77dd9657fdd2e7c2bd2f76070.jpg"},
        {"ind":"garpu","ter":"garpu","img":"https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//97/MTA-7176256/super_doll_super_doll_garpu_makan_stainless_steel_-_6_pcs_-_-_401_full01_iwyx608z.jpg"},
        {"ind":"sumpit","ter":"bali bali","img":"https://asset.kompas.com/crops/mE4NGFZge4VcZHM5wmpQb89GwcY=/73x0:932x573/1200x800/data/photo/2022/03/03/622082b79373e.jpg"},        
        {"ind":"pisau","ter":"pisau","img":"https://mediaindonesia.gumlet.io/news/2021/10/dfdb8d376bb2237e2a5ba5e9bca95e09.jpg?w=360&dpr=2.6"},
        {"ind":"piring","ter":"piring","img":"https://png.pngtree.com/recommend-works/png-clipart/20240821/ourmid/pngtree-stack-of-white-ceramic-plates-png-image_13551649.png"},
        {"ind":"gelas","ter":"gelas","img":"https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/842/1384269_PE962939_S4.jpg"},
        {"ind":"cangkir","ter":"cangkir","img":"https://www.kopijayakarta.com/image-product/img768-1582258853.jpg"},
        {"ind":"botol","ter":"botol","img":"https://mmc.tirto.id/image/2022/10/28/botol-corkcicle_ratio-16x9.jpg"}
      ],
      "Benda": [
        {"ind":"buku","ter":"buku","img":"https://www.pertuni.or.id/wp-content/uploads/2021/01/books-690219_1920.jpg"},
        {"ind":"pensil","ter":"pensil","img":"https://krayond.com/wp-content/uploads/2023/06/pensil-fc-1.jpg"},
        {"ind":"pulpen","ter":"bolpoin","img":"https://siopen.hulusungaiselatankab.go.id/storage/merchant/products/2022/10/10/09d38fad018f5fe13dd5eb2edbc1afec.jpg"},
        {"ind":"penghapus","ter":"penghapus","img":"https://siplah.blibli.com/data/images/SCKG-0016-00192/e6acda5f-5b43-43bb-a424-9bf858d3ff0f.jpg"},
        {"ind":"penggaris","ter":"penggaris","img":"https://siopen.balangankab.go.id/storage/merchant/products/2024/03/14/ad1b226096b2cdf66593cb5b5c298aa1.jpg"},
        {"ind":"tas","ter":"tas","img":"https://tokonindy.com/cdn/uploads/120211025195316.jpg"},
        {"ind":"dompet","ter":"dompet","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDQOvWmY82_TOfyRIoDAbWsAEdItw9evJtuufMm7hE3ZK_xRi6Kp7NYDZJRDcqYvFLju8&usqp=CAU"},
        {"ind":"kunci","ter":"kunci","img":"https://media.istockphoto.com/id/178619288/id/foto/kumpulan-kunci-rumah.jpg?s=612x612&w=0&k=20&c=MgIJbq_MyXfHtpxzppYKn0LbTwM0fvCwNkA4FcIqr1M="},
        {"ind":"kacamata","ter":"kacamata","img":"https://contents.mediadecathlon.com/p2865580/k$4ca246af232f51326090611622acc291/kacamata-anti-uv-mh-160-cat-3-hitam-decathlon-8936600.jpg"},
        {"ind":"cermin","ter":"kaca","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNqMfr8E8Zq7RiBJD5s-eK7rxQGttotYFgsDxweA2rsmIaLDps6TmUddGzgeFAwBpmVII&usqp=CAU"},
        {"ind":"kalung","ter":"kalung","img":"https://down-id.img.susercontent.com/file/bae64ecaaa0c16442366e4da4278c1c6"},
        {"ind":"cincin","ter":"cincin","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW2tPdJI1c0hRrN_ql9rQDhn1_zaiuKiRLaqnm_UFJCvBgohmFxmUQ6Fq1PuA-JuKRl24&usqp=CAU"},
        {"ind":"anting","ter":"anting","img":"https://img.lazcdn.com/g/ff/kf/S98ecde1e506e4be98ddca1b2ec5d1d9a5.jpg_720x720q80.jpg"},
        {"ind":"gelang","ter":"gelang","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSWz0j-q-c9WenhkwobNowO_Ck4TI_rgCsNg&s"},
        {"ind":"topi","ter":"topi","img":"https://down-id.img.susercontent.com/file/id-11134207-7qukx-lf0ua1cfd38t2e"},
        {"ind":"payung","ter":"payung","img":"https://down-id.img.susercontent.com/file/id-11134201-23030-3p7eq4o3ahovc5"},
        {"ind":"kartu identitas","ter":"kartu identitas","img":"https://disdukcapil.bulelengkab.go.id/uploads/konten/56_apa-itu-kartu-identitas-anak-kia.png"},
        {"ind":"paspor","ter":"paspor","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQikwuHWbJAlzRj46XbTU19EnFzrkLMCH2NuA&s"},
        {"ind":"uang","ter":"dhuwit","img":"https://awsimages.detik.net.id/community/media/visual/2022/08/22/melihat-lebih-dekat-ukuran-rupiah-baru-yang-berbeda-dan-makin-kecil-4_169.jpeg?w=1200"},
        {"ind":"peta","ter":"peta","img":"https://down-id.img.susercontent.com/file/id-11134207-7rase-m4sshezsi3i832"},
        {"ind":"kompas","ter":"kompas","img":"https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,f_auto,q_auto:best,w_640/v1634025439/01hy7my05nvtzhgkcpwvghcvd3.png"},
        {"ind":"kamera","ter":"kamera","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh999BTwvwis13BjGpulVdAkmUMWF6X5l3TQ&s"},
        {"ind":"radio","ter":"radio","img":"https://images-cdn.ubuy.co.id/633ade6df93bd53148021a31-3-5.jpg"},
        {"ind":"speaker","ter":"speaker","img":"https://www.sweelee.com.my/cdn/shop/products/products_2FA05-AE-A5_2BBT-BLK_2FA05-AE-A5_2BBT-BLK_1611652326800.jpg?v=1623301833&width=2048"},
        {"ind":"headphone","ter":"headphone","img":"https://images.tokopedia.net/img/HCoJbh/2025/3/12/51fa1285-8164-404e-a0b5-ba1a41fbd085.jpg"},
        {"ind":"mikrofon","ter":"mikrofon","img":"https://images.tokopedia.net/img/cache/700/VqbcmM/2020/11/3/188e9f20-366b-4c4f-a3ed-45e0d6524a92.jpg"},
        {"ind":"laptop","ter":"laptop","img":"https://i.pcmag.com/imagery/reviews/01Nb7ULQkkPJWE4dqsewfHz-1.fit_lim.size_919x518.v1727453897.jpg"},
        {"ind":"tablet","ter":"tablet","img":"https://www.pricebook.co.id/_next/image?url=https%3A%2F%2Fmedia.pricebook.co.id%2Farticle%2F5cacc561b92c2ee6048b4651%2F5cacc561b92c2ee6048b4651_1735548480.jpg&w=1080&q=75"},
        {"ind":"charger","ter":"charger","img":"https://cdn.shopify.com/s/files/1/0610/7640/6438/files/2068203311_480x480.jpg?v=1694590184"},
        {"ind":"flashdisk","ter":"flashdisk","img":"https://mediaindonesia.gumlet.io/news/2016/04/disk.jpg?w=360&dpr=2.6"},
        {"ind":"printer","ter":"printer","img":"https://img.id.my-best.com/product_images/c2a9a2bda95bcf7bda30c82406a27e3a.png?ixlib=rails-4.3.1&q=70&lossless=0&w=800&h=800&fit=clip&s=ee9bb846510613b4f0c04d4b37014286"},
        {"ind":"scanner","ter":"scanner","img":"https://cdn.shopify.com/s/files/1/1533/5545/files/20170319_IQ_FLEX_Open_side_600x450_a584960b-e1e1-481c-80db-798b4e7553ef_480x480.png?v=1613515371"},
        {"ind":"kamera digital","ter":"kamera digital","img":"https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//79/MTA-2211810/canon_canon-eos-3000d-kit-18-55mm-iii-kamera-dslr---black_full03.jpg"},
        {"ind":"keranjang","ter":"keranjang","img":"https://down-id.img.susercontent.com/file/id-11134207-7r98q-lq93ga439qk2fe"}
      ],
      "Transportasi": [
        {"ind":"mobil","ter":"mobil","img":"https://lh7-us.googleusercontent.com/DuwzplfSHzmhzKSZCv_XLIDSpXYhXCSX0vJQxlkBO9jo_SohUoB5-KpdrOsRd9wqgfNPLLACoODW2HO94TqR1GLhhf5MFkgj15DHVnQRjXGaqHKofgyyYTAlfqU-p4AEFFzluL75hYj5SgR9iH_z530"},
        {"ind":"motor","ter":"motor","img":"https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/105/MTA-179347218/yamaha_yamaha_full08.jpg"},
        {"ind":"sepeda","ter":"sepedha","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7709rZTFpOofQPKjkwMEh0rlp2WuNi4Ktrw&s"},
        {"ind":"bus","ter":"bis","img":"https://aws-images-prod.sindonews.net/dyn/600/pena/sindo-article/original/2023/09/09/big_bus_jetbus_3__shd_151.jpg"},
        {"ind":"truk","ter":"truk","img":"https://www.sunstarmotor.id/wp-content/uploads/2020/06/Fighter-FM-65-FL.jpg"},
        {"ind":"kereta api","ter":"sepur","img":"https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,f_auto,q_auto:best,w_640/v1544267816/vl5gkhht1nvmjldgmfbg.jpg"},
        {"ind":"pesawat","ter":"pesawat","img":"https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/217/2025/05/14/a7dfa93c032790964acffed0b7e9ea92-1998582506.jpg"},
        {"ind":"kapal","ter":"kapal","img":"https://asset.kompas.com/crops/zH3h7j319O1XYABHUKlTo4OF3sw=/78x80:878x613/750x500/data/photo/2020/01/31/5e33af8173e82.jpg"},
        {"ind":"perahu","ter":"perahu","img":"https://mitra.boatria.com/assets/customers/865-danialdi498/1ee91ffead7675adedb6c9f952a06f40.jpg"},
        {"ind":"becak","ter":"becak","img":"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiQFlxNsV2R_UAkZTf7dgorHjuu4yMSanbrfRubtgG3gwofr91s0uD-PuI2Ny7NzyMF2ISiC7kqkwvje9BAC3A43nsaEVqQIDc0ACrKoRxSmJzOzUHw1_zI4Ubfprqy8COxtowOf4PKk1Nl/s1600/DSC05937.jpg"},
        {"ind":"bentor","ter":"bentor","img":"https://nusadaily.com/uploads/images/202302/image_750x_63fb074155590.jpg"},
        {"ind":"bajaj","ter":"bajaj","img":"https://images.bisnis.com/photos/2019/06/01/135980/bajaj010619-1.jpg"},
        {"ind":"ojek","ter":"ojek","img":"https://assets.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/jawapos/2020/04/ojol-psbb.jpg"},
        {"ind":"taksi","ter":"taksi","img":"https://otoklix-production.s3.amazonaws.com/uploads/2022/10/mobil-bekas-taxi.jpg"},
        {"ind":"helikopter","ter":"helikopter","img":"https://generasipeneliti.id/images_news/REF-AHENuqzTS84ID5hhd5mLaZuAY_image.jpg"}
      ],
      "Pakaian": [
        {"ind":"baju","ter":"klambi","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUUiAnMvQClzqwQenn3C9_HkjloBd8V_3mdw&s"},
        {"ind":"celana","ter":"celana","img":"https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/460268/item/goods_56_460268_3x4.jpg?width=494"},
        {"ind":"rok","ter":"rok","img":"https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//105/MTA-54683448/no-brand_mizuni-skirt-rok-wanita-kekinian-rok-bawahan-wanita-rok-terbaru_full01.jpg"},
        {"ind":"jaket","ter":"jaket","img":"https://img.lazcdn.com/g/p/2b57248f0dc2433d73581c7fbb307b80.jpg_720x720q80.jpg"},
        {"ind":"sepatu","ter":"sepatu","img":"https://www.happystore.id/_next/image?url=https%3A%2F%2Fcf.shopee.co.id%2Ffile%2Fid-11134207-7r98z-lyq93hhvjdvsae&w=3840&q=75"},
        {"ind":"sandal","ter":"sandal","img":"https://antarestar.com/wp-content/uploads/2024/09/SENDAL-EXCIDO-PHOTO-BARU-MALL-2.png"},
        {"ind":"topi","ter":"topi","img":"https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/96/MTA-150739500/brd-44261_verish-topi-baseball-pria-wanita-dewasa-distro-fashion-casual-cap-outdoor-trendy-kualitas-bahan-import-bscf_full01-40d5a70f.jpg"},
        {"ind":"kaos kaki","ter":"kaos sikil","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8QNif8Uw95yJVuuuQD3XKqx91X5LrRmo2HQ&s"},
        {"ind":"sarung tangan","ter":"sarung tangan","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkECYV4xcD7qHpZ3VrLX30jcUTNBw517cU6Q&s"},
        {"ind":"dasi","ter":"dasi","img":"https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Krawaty.jpg/960px-Krawaty.jpg"},
        {"ind":"kemeja","ter":"kemeja","img":"https://cartenztactical.com/wp-content/uploads/2022/04/C14L-112-kat-1-scaled.jpg"},
        {"ind":"jas","ter":"jas","img":"https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//97/MTA-20256809/brd-44261_jas-blazer-pria-jas-resmi-jas-formal_full01.jpg"},
        {"ind":"gaun","ter":"gaun","img":"https://london.bridestory.com/images/c_fill,dpr_1.0,f_auto,fl_progressive,pg_1,q_80,w_680/v1/assets/mmexport1572260847795-BkxSCsScr/sewa-gaun-pesta_wedding-dress1701387098_1.jpg"}
      ],

    },
    "Kata Kerja": {
      "Aktivitas Sehari-hari": [
        {"ind":"makan","ter":"oho","img":"https://akcdn.detik.net.id/visual/2020/04/07/8030bfe8-b51a-447c-a430-a0a6428a5ddf_169.jpeg?w=650"},
        {"ind":"minum","ter":"minum","img":"https://awsimages.detik.net.id/community/media/visual/2024/03/25/shutterstock.jpeg?w=600&q=90"},
        {"ind":"tidur","ter":"turu","img":"https://img-cdn.medkomtek.com/XzJr8QtZD7EKvZJUhfzQsrAQ_k4=/fit-in/0x0/smart/filters:quality(100):strip_icc():format(webp)/article/Nmmb8zu3NwHJS65kpiw1R/original/012684600_1540543739-Benarkah-Remaja-Perlu-Lebih-Banyak-Tidur-By-Africa-Studio-Shutterstock.jpg"},
        {"ind":"pergi","ter":"pigi","img":"https://static.republika.co.id/uploads/images/inpicture_slide/travelling-ilustrasi-_141008092705-261.jpg"},
        {"ind":"pulang","ter":"pulang","img":"https://asset.kompas.com/crops/VHwYu1m0vF3PibceEXTDN3ZDnGs=/256x71:1280x753/750x500/data/photo/2021/04/02/6066a158ecabf.jpg"},
        {"ind":"bangun tidur","ter":"bangun tidur","img":"https://img-cdn.medkomtek.com/rNd4eoRLLq4zUgmewIsy0WO866A=/0x0/smart/filters:quality(100):format(webp)/article/jw6sAD1J9sLqkhFTVFAuh/original/095191900_1611546241-Penyebab-Mood-Swing-pada-Anak-saat-Bangun-Tidur-by-Freepik.jpg"},
        {"ind":"berjalan","ter":"mlaku","img":"https://cdn0-production-images-kly.akamaized.net/-r07uW4nGmW_Jx_pRKqYaKyXE-I=/0x868:8416x5612/800x450/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4155578/original/059517300_1663033503-Potret_Berjalan_Kaki_Santai_di_Alam_Terbuka.jpg"},
        {"ind":"lari","ter":"mlayu","img":"https://cdn1-production-images-kly.akamaized.net/z1c-Ujo5zNwQXW0uDKgdyGC3wqs=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3268460/original/088189000_1602753349-jonathan-chng-HgoKvtKpyHA-unsplash.jpg"},
        {"ind":"berlari","ter":"amlayu","img":"https://linisehat.com/wp-content/uploads/2023/11/jalan-kaki-e1701329016882.jpg"},
        {"ind":"berenang","ter":"renang","img":"https://jambiindependent.bacakoran.co/upload/f4bf34c9f0f642ad4a0d4faefce1c869.jpg"},
        {"ind":"melompat","ter":"mlumpat","img":"https://cdn.grid.id/crop/0x0:0x0/x/photo/2023/01/26/melompatjpg-20230126110927.jpg"},
        {"ind":"duduk","ter":"lungguh","img":"https://static.honestdocs.id/450x400/webp/system/blog_articles/main_hero_images/000/004/573/original/iStock-1137312447_%281%29.jpg"},
        {"ind":"berdiri","ter":"ngadeg","img":"https://asset-a.grid.id/crop/80x70:1241x863/700x465/photo/2018/12/16/4201889767.jpeg"},
        {"ind":"merangkak","ter":"merangkak","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeSYhSMWIIMIA2ZlOWNfB9dcPoZqIXFO0KTriK4EGvzXBzZ9-6egxipCmYaFpvUOEWsP4&usqp=CAU"},
        {"ind":"membaca","ter":"maca","img":"https://hypeabis.id/assets/content/2023081416313100000020230814160545portraitstudentchildgirlstudyinglibrary11.jpg"},
        {"ind":"menulis","ter":"nulis","img":"https://www.gramedia.com/blog/content/images/2022/10/Screenshot-2022-10-31-154045.jpg"},
        {"ind":"belajar","ter":"sinau","img":"https://radarbanyumas.disway.id/upload/84200b799d075d819b57084e10b890b7.jpg"},
        {"ind":"mengajar","ter":"ngajar","img":"https://fun-storage.sgp1.cdn.digitaloceanspaces.com/file_blog/1648025222tips%20menjadi%20guru%20favorit%20bagi%20siswa.jpg"},
        {"ind":"bermain","ter":"dolanan","img":"https://asset.kompas.com/crops/JSevcavFEBJuxwQbNmMm5x9YxV0=/38x69:838x602/1200x800/data/photo/2020/07/23/5f18d345cb9dd.jpg"},
        {"ind":"bekerja","ter":"kerja","img":"https://i0.wp.com/www.harakatuna.com/wp-content/uploads/2023/12/niat-bekerja.jpg?fit=1200%2C800&ssl=1"},
        {"ind":"berbicara","ter":"omong","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU-1_3Rv1l-QCtvpGLoy8jjNgeVfwCuWnQMg&s"},
        {"ind":"mendengarkan","ter":"rungu","img":"https://i0.wp.com/www.harakatuna.com/wp-content/uploads/2022/11/ilustrasi-orang-bicara-ini-zodiak-yang-terkenal-super-manis-saat-diajak-ngobrol.jpg?resize=696%2C391&ssl=1"},
        {"ind":"melihat","ter":"delok","img":"https://img-cdn.medkomtek.com/qFeEv2iPoRd_FywuI7oXnTB-Nk4=/510x395/smart/filters:quality(100):format(webp)/article/xQFCwccyptoTFhpq8thGW/original/086987600_1577875819-Mata-Silau-Saat-Melihat-Cahaya-Terang-Kapan-Harus-Khawatir-shutterstock_736460488.jpg"},
        {"ind":"mencium (bau)","ter":"cium (ambune)","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM8NhkB2tmss_NOsASJGRwYxjPIaHJXiCXqAr2FmQHz8ldVtrBRUzYPMmO-8jBvFbV2CE&usqp=CAU"},
        {"ind":"merasa (rasa)","ter":"rasa (rasane)","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDbYTnuVMIgb2W_B52NxZNJ_gHk8ZFnDlnGY4KTrGm_cNtOW033Tg0ClEff4MWMeNbq2Q&usqp=CAU"},
        {"ind":"memegang (pegang)","ter":"genggem (genggemane)","img":"https://stiba.ac.id/wp-content/uploads/2016/02/mendidik-anak-dalam-islam.jpg"},
        {"ind":"menyentuh (sentuh)","ter":"tutul (tutulane)","img":"https://st3.depositphotos.com/1004384/13612/i/1600/depositphotos_136120706-stock-photo-little-girl-touches-boy-with.jpg"},
        {"ind":"membersihkan","ter":"resik","img":"https://www.kuponbaru.com/wp-content/uploads/2019/07/Cara-Membersihkan-Rumah-Secara-Menyeluruh.jpg"},
        {"ind":"membuka (buka)","ter":"mbukak (mbukakne)","img":"https://st.depositphotos.com/27811286/58277/v/1600/depositphotos_582775934-stock-illustration-little-kid-open-door-friend.jpg"},
        {"ind":"menutup (tutup)","ter":"tutup (tutupne)","img":"https://png.pngtree.com/png-clipart/20210718/original/pngtree-a-beautiful-muslimah-open-the-door-png-image_6541663.jpg"},
        {"ind":"memasak (masak)","ter":"masak (masakne)","img":"https://awsimages.detik.net.id/community/media/visual/2024/02/25/kesalahan-memasak-1.jpeg?w=1200"},
        {"ind":"membeli (beli)","ter":"tuku (tukune)","img":"https://asset-2.tribunnews.com/tribunkaltimtravel/foto/bank/images/beli-baju-baru-lagi.jpg"},
        {"ind":"menjual (jual)","ter":"adol (adoline)","img":"https://png.pngtree.com/png-clipart/20241208/original/pngtree-fruit-seller-selling-oranges-buy-and-sell-clip-art-png-image_17664797.png"},
        {"ind":"membawa (bawa)","ter":"gawa (gawane)","img":"https://png.pngtree.com/png-clipart/20230716/original/pngtree-kids-bring-a-book-png-image_9308110.png"},
        {"ind":"mengambil (ambil)","ter":"jupuk (jupukne)","img":"https://media.istockphoto.com/id/1472538743/id/foto/anak-sekolah-kecil-mengambil-buku-dari-rak-di-perpustakaan-dengan-setumpuk-buku-di-tangan.jpg?s=170667a&w=0&k=20&c=c3yjKqtUkY-jA9Rkz0XNXabTMmD5zYv5BDH-SewQ_4c="},
        {"ind":"memberi (beri)","ter":"menehi (menehine)","img":"https://asset-2.tribunnews.com/jambi/foto/bank/images/beri-uang-anak-orangtua.jpg"},
        {"ind":"menerima (terima)","ter":"nampa (nampane)","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCYejKpUb273dmXMnDt9IfuipHDziK59T8lg&s"},
        {"ind":"berpikir","ter":"pikir","img":"https://bimba-aiueo.com/wp-content/uploads/2018/06/1d9e05c1-5_0_994_665_c517f75ae5aa4fcf5d99a82eefe5996f0e731ec0.jpg"},
        {"ind":"membantu","ter":"mbantu"},
        {"ind":"mencari","ter":"golèk"},
        {"ind":"menemukan","ter":"temu"},
        {"ind":"mengerti","ter":"ngerti"},
        {"ind":"tidak mengerti","ter":"ora ngerti"},        
        {"ind":"ingat","ter":"eling"},
        {"ind":"lupa","ter":"lali"},
        {"ind":"menunggu","ter":"ngenteni"},
        {"ind":"bertemu","ter":"ketemu"},
        {"ind":"datang ","ter":"tèkè"},
        {"ind":"pulang","ter":"bali"},
        {"ind":"naik","ter":"munggah"},
        {"ind":"turun","ter":"mudhun"},
        {"ind":"memakai","ter":"nganggo"},
        {"ind":"melepaskan","ter":"mbukak"},
        {"ind":"mencuci","ter":"ngumbah"},
        {"ind":"menyisir","ter":"nyisir"},
        {"ind":"mencukur","ter":"nggukur"},
        {"ind":"mandi","ter":"adus"},
        {"ind":"gosok gigi","ter":"sikat untu"},
        {"ind":"membuat","ter":"gawe"},
        {"ind":"menggambar","ter":"nggambari"},
        {"ind":"memotong","ter":"motong"},    
        {"ind":"menyanyi","ter":"nyanyi"},
        {"ind":"menari","ter":"tari"},
        {"ind":"berdoa","ter":"ndonga"},
        {"ind":"bermain musik","ter":"dolanan musik"},
        {"ind":"memotret","ter":"njupuk foto"},
        {"ind":"merekam video","ter":"ngrekam video"},
        {"ind":"mengendarai","ter":"nyopir"},
        {"ind":"mengemudi","ter":"nyopir"},
        {"ind":"membaca","ter":"membaca"},
        {"ind":"menonton","ter":"nonton"},
        {"ind":"berbelanja","ter":"belanja"},
        {"ind":"memelihara","ter":"ngopeni"},
        {"ind":"merawat","ter":"ngopeni"},
        {"ind":"berkebun","ter":"tandur"},
        {"ind":"memancing","ter":"mancing"},  
        {"ind":"berburu","ter":"mabur"},
        {"ind":"sedang","ter":"sed"},
        {"ind":"sedang makan","ter":"sema"},
      ],
      "Gerakan": [
        {"ind":"berjalan","ter":"jalan","img":"https://cdn0-production-images-kly.akamaized.net/-r07uW4nGmW_Jx_pRKqYaKyXE-I=/0x868:8416x5612/800x450/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4155578/original/059517300_1663033503-Potret_Berjalan_Kaki_Santai_di_Alam_Terbuka.jpg"},
        {"ind":"berlari","ter":"mlayu","img":"https://www.sfidn.com/article/lib/upload/images/SFIDN-12-Tips-agar-Anda-Mampu-Berlari-Lebih-Cepat-daripada-Sebelumnya-1.jpg"},
        {"ind":"lompat","ter":"mlumpat","img":"https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/11/09140019/Ini-Teknik-Dasar-Lompat-Jauh-dan-Tips-Terhindar-dari-Cedera.jpg"},
        {"ind":"duduk","ter":"lungguh","img":"https://static.honestdocs.id/450x400/webp/system/blog_articles/main_hero_images/000/004/573/original/iStock-1137312447_%281%29.jpg"},
        {"ind":"berdiri","ter":"ngadeg","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpBvDB-TdnoQLuiEWIk_f_wQn8axkyygSZUA&s"},
        {"ind":"jongkok","ter":"ngangkuk","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFcfLBRXh7-PYgoY7Urku5KF9fS_eSyWnhww&s"},
        {"ind":"merangkak","ter":"ngretek","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQIfm8f2dFWUnnbDQPeU8iWZKiUXqLxp90hVJQkTnwLYzAtXH4H4s6wN8l7w3FRcnq1T4&usqp=CAU"},
        {"ind":"membungkuk","ter":"ngungkuk","img":"https://res.cloudinary.com/dk0z4ums3/image/upload/v1636041548/attached_image/kyphosis.jpg"},
        {"ind":"naik","ter":"naik","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDmianqQgIA0LQmEY7F13LU6KXEKumjBQYBQ&s"},
        {"ind":"turun","ter":"mudhun","img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2hpKbuVlVKw-KxRi_ID7k8iA9W7-o8Pqj7xe6uWJNAHr9I0FifVI5exdUwelo4krlqaY&usqp=CAU"},
        {"ind":"masuk","ter":"masuk","img":"https://asset-2.tribunnews.com/jabar/foto/bank/images/Adab-Bertamu-Dalam-Islam.jpg"},
        {"ind":"keluar","ter":"metu","img":"assets/img/keluar.png"},
        {"ind":"pegang","ter":"pegang","img":"assets/img/pegang.png"},
        {"ind":"sentuh","ter":"tutul","img":"assets/img/sentuh.png"},
        {"ind":"tolak","ter":"tulak","img":"assets/img/tolak.png"},
        {"ind":"tarik","ter":"tarik","img":"assets/img/tarik.png"},
        {"ind":"angkat","ter":"angkat","img":"assets/img/angkat.png"},
        {"ind":"jatuh","ter":"turu","img":"assets/img/jatuh.png"},
        {"ind":"guling","ter":"guling","img":"assets/img/guling.png"},
        {"ind":"menggelinding","ter":"ngguling","img":"assets/img/menggelinding.png"},
        {"ind":"lempar","ter":"lempar","img":"assets/img/lempar.png"},
        {"ind":"berputar","ter":"muter","img":"assets/img/berputar.png"},
        {"ind":"mengelilingi","ter":"ngubengi","img":"assets/img/mengelilingi.png"},
        {"ind":"menyusuri","ter":"nyusuri","img":"assets/img/menyusuri.png"},
        {"ind":"mendaki","ter":"munggah","img":"assets/img/mendaki.png"},
        {"ind":"berlari","ter":"mlayu","img":"assets/img/lari.png"},
        {"ind":"menyelinap","ter":"nyelip","img":"assets/img/menyelinap.png"},
        {"ind":"merayap","ter":"ngretek","img":"assets/img/merayap.png"},
        {"ind":"memanjat","ter":"munggah","img":"assets/img/memanjat.png"},
        {"ind":"mendorong","ter":"tulak","img":"assets/img/mendorong.png"},
        {"ind":"menarik","ter":"tarik","img":"assets/img/menarik.png"},
        {"ind":"mengangkat","ter":"angkat","img":"assets/img/mengangkat.png"},  
        {"ind":"angkat","ter":"angkat","img":"assets/img/angkat.png"},
        {"ind":"turunkan","ter":"mudhunno","img":"assets/img/turunkan.png"},
        {"ind":"dorong","ter":"tulak","img":"assets/img/dorong.png"},
        {"ind":"tarik","ter":"tarik","img":"assets/img/tarik.png"},
        {"ind":"putar","ter":"puter","img":"assets/img/putar.png"},
        {"ind":"goyang","ter":"goyang","img":"assets/img/goyang.png"},
        {"ind":"angkat tangan","ter":"angkat tangan","img":"assets/img/angkat_tangan.png"},
        {"ind":"tepuk tangan","ter":"plok tangan","img":"assets/img/tepuk_tangan.png"},
        {"ind":"jabat tangan","ter":"salam tangan","img":"assets/img/jabat_tangan.png"},
        {"ind":"salaman","ter":"salam tangan","img":"assets/img/salaman.png"},
        {"ind":"melambai","ter":"lambaian tangan","img":"assets/img/melambai.png"},
        {"ind":"mengangguk","ter":"ngangguk","img":"assets/img/mengangguk.png"},
        {"ind":"menggeleng","ter":"nggoyangno","img":"assets/img/menggeleng.png"},
        {"ind":"menggaruk","ter":"nggaruk","img":"assets/img/menggaruk.png"}
      ],
      "pekerjaan": [
        {"ind":"bekerja","ter":"kerja","img":"assets/img/bekerja.png"},
        {"ind":"menanam","ter":"menanam","img":"assets/img/menanam.png"},
        {"ind":"memanen","ter":"panen","img":"assets/img/memanen.png"},
        {"ind":"memotong rumput","ter":"motong suket","img":"assets/img/memotong_rumput.png"},
        {"ind":"menggembala","ter":"nggembala","img":"assets/img/menggembala.png"},
        {"ind":"memerah susu","ter":"nyedot susu","img":"assets/img/memerah_susu.png"},
        {"ind":"memetik buah","ter":"njupuk woh","img":"assets/img/memetik_buah.png"},
        {"ind":"mengajar","ter":"ngajar","img":"assets/img/mengajar.png"},
        {"ind":"belajar","ter":"sinau","img":"assets/img/belajar.png"},
        {"ind":"memasak","ter":"masak","img":"assets/img/memasak.png"},
        {"ind":"menjahit","ter":"njahit","img":"assets/img/menjahit.png"},
        {"ind":"menyanyi","ter":"nyanyi","img":"assets/img/menyanyi.png"},
        {"ind":"menari","ter":"tari","img":"assets/img/menari.png"},
        {"ind":"melukis","ter":"nggambari","img":"assets/img/melukis.png"},
        {"ind":"menggambar","ter":"nggambari","img":"assets/img/menggambar.png"},
        {"ind":"memotret","ter":"njupuk foto","img":"assets/img/memotret.png"},
        {"ind":"merekam","ter":"ngrekam video","img":"assets/img/merekam.png"},
        {"ind":"menulis","ter":"nulis","img":"assets/img/menulis.png"},
        {"ind":"membaca","ter":"maca","img":"assets/img/membaca.png"},
        {"ind":"membeli","ter":"tuku","img":"assets/img/membeli.png"},
        {"ind":"menjual","ter":"adol","img":"assets/img/menjual.png"},
        {"ind":"memancing","ter":"mancing","img":"assets/img/memancing.png"},
        {"ind":"berburu","ter":"mabur","img":"assets/img/berburu.png"},
        {"ind":"bertani","ter":"tandur","img":"assets/img/bertani.png"},
        {"ind":"berkebun","ter":"tandur","img":"assets/img/berkebun.png"},
        {"ind":"memelihara","ter":"ngopeni","img":"assets/img/memelihara.png"},
        {"ind":"merawat","ter":"ngopeni","img":"assets/img/merawat.png"},
        {"ind":"membantu","ter":"mbantu","img":"assets/img/membantu.png"},
        {"ind":"membersihkan","ter":"resik","img":"assets/img/membersihkan.png"},
        {"ind":"mencuci","ter":"ngumbah","img":"assets/img/mencuci.png"},
        {"ind":"menyapu","ter":"nyapu","img":"assets/img/menyapu.png"},
        {"ind":"mengelap","ter":"ngelap","img":"assets/img/mengelap.png"},
        {"ind":"menyetrika","ter":"nyetrika","img":"assets/img/menyetrika.png"},
        {"ind":"memotong","ter":"motong","img":"assets/img/memotong.png"},
        {"ind":"membuat","ter":"gawe","img":"assets/img/membuat.png"},
        {"ind":"memperbaiki","ter":"ndandani","img":"assets/img/memperbaiki.png"},
        {"ind":"mengendarai","ter":"nyopir","img":"assets/img/mengendarai.png"},
        {"ind":"mengemudi","ter":"nyopir","img":"assets/img/mengemudi.png"},
        {"ind":"menyetir","ter":"nyopir","img":"assets/img/menyetir.png"}
      ],
      "Sosial": [
        {"ind":"sapa","ter":"sapa","img":"assets/img/sapa.png"},
        {"ind":"menyapa","ter":"nyapa","img":"assets/img/menyapa.png"},
        {"ind":"salam","ter":"salam","img":"assets/img/salam.png"},
        {"ind":"tolong","ter":"tolong","img":"assets/img/tolong.png"},
        {"ind":"terima kasih","ter":"matur nuwun","img":"assets/img/terima_kasih.png"},
        {"ind":"maaf","ter":"ngapunten","img":"assets/img/maaf.png"},
        {"ind":"permisi","ter":"permisi","img":"assets/img/permisi.png"},
        {"ind":"kasih","ter":"kasih","img":"assets/img/kasih.png"},
        {"ind":"ambil","ter":"ambil","img":"assets/img/ambil.png"},
        {"ind":"senyum","ter":"senyum","img":"assets/img/senyum.png"},
        {"ind":"tersenyum","ter":"mesem","img":"assets/img/tersenyum.png"},
        {"ind":"marah","ter":"marah","img":"assets/img/marah.png"},
        {"ind":"peluk","ter":"peluk","img":"assets/img/peluk.png"},
        {"ind":"memeluk","ter":"ngemut","img":"assets/img/memeluk.png"},
        {"ind":"cium","ter":"cium","img":"assets/img/cium.png"},
        {"ind":"mencium","ter":"cium","img":"assets/img/mencium.png"},
        {"ind":"selamat","ter":"slamet","img":"assets/img/selamat.png"},
        {"ind":"selamat datang","ter":"slamet rawuh","img":"assets/img/selamat_datang.png"},
        {"ind":"sampai jumpa","ter":"ketemu meneh","img":"assets/img/sampai_jumpa.png"},
        {"ind":"selamat tinggal","ter":"slamet tinggal","img":"assets/img/selamat_tinggal.png"},
        {"ind":"selamat jalan","ter":"slamet dalan","img":"assets/img/selamat_jalan.png"},
        {"ind":"selamat pagi","ter":"slamet enjing","img":"assets/img/selamat_pagi.png"},
        {"ind":"selamat siang","ter":"slamet awan","img":"assets/img/selamat_siang.png"},
        {"ind":"selamat sore","ter":"slamet sonten","img":"assets/img/selamat_sore.png"},
        {"ind":"selamat malam","ter":"slamet bengi","img":"assets/img/selamat_malam.png"},
        {"ind":"bersalaman","ter":"salam tangan","img":"assets/img/bersalaman.png"},
        {"ind":"tanya","ter":"tanya","img":"assets/img/tanya.png"},
        {"ind":"bertanya","ter":"nanya","img":"assets/img/bertanya.png"},
        {"ind":"jawab","ter":"jawab","img":"assets/img/jawab.png"},
        {"ind":"menjawab","ter":"mbales","img":"assets/img/menjawab.png"},
        {"ind":"mengundang","ter":"ngundang","img":"assets/img/mengundang.png"},
        {"ind":"mengunjungi","ter":"ngunjungi","img":"assets/img/mengunjungi.png"},
        {"ind":"bicara","ter":"bicara","img":"assets/img/bicara.png"},
        {"ind":"mengobrol","ter":"ngobrol","img":"assets/img/mengobrol.png"},
        {"ind":"dengar","ter":"dengar","img":"assets/img/dengar.png"},
        {"ind":"mendengar","ter":"rungu","img":"assets/img/mendengar.png"},  
        {"ind":"bertemu","ter":"ketemu","img":"assets/img/bertemu.png"},
        {"ind":"berkunjung","ter":"dolanan","img":"assets/img/berkunjung.png"},
        {"ind":"berpesta","ter":"pesta","img":"assets/img/berpesta.png"},
        {"ind":"merayakan","ter":"ngrayakno","img":"assets/img/merayakan.png"},
        {"ind":"berdoa","ter":"ndonga","img":"assets/img/berdoa.png"},
        {"ind":"bersosialisasi","ter":"sosialisasi","img":"assets/img/bersosialisasi.png"},
        {"ind":"berbicara","ter":"omong","img":"assets/img/berbicara.png"},
        {"ind":"mengobrol","ter":"ngobrol","img":"assets/img/mengobrol.png"},
        {"ind":"bercanda","ter":"guyon","img":"assets/img/bercanda.png"},
        {"ind":"tertawa","ter":"guyu","img":"assets/img/tertawa.png"}
      ],
    },
    "Kata Sifat": {
      "Ukuran": [
        {"ind":"besar","ter":"gedhe","img":"assets/img/besar.png"},
        {"ind":"kecil","ter":"cilik","img":"assets/img/kecil.png"},
        {"ind":"panjang","ter":"dawa","img":"assets/img/panjang.png"},
        {"ind":"pendek","ter":"cekak","img":"assets/img/pendek.png"},
        {"ind":"tinggi","ter":"dhuwur","img":"assets/img/tinggi.png"},
        {"ind":"rendah","ter":"endhek","img":"assets/img/rendah.png"},
        {"ind":"cepat","ter":"cepet","img":"assets/img/cepat.png"},
        {"ind":"lambat","ter":"alot","img":"assets/img/lambat.png"},
        {"ind":"baru","ter":"anyar","img":"assets/img/baru.png"},
        {"ind":"lama","ter":"lawas","img":"assets/img/lama.png"},
        {"ind":"panas","ter":"panas","img":"assets/img/panas.png"},
        {"ind":"dingin","ter":"adhem","img":"assets/img/dingin.png"},
        {"ind":"hangat","ter":"anget","img":"assets/img/hangat.png"},
        {"ind":"berat","ter":"abote","img":"assets/img/berat.png"},
        {"ind":"ringan","ter":"enteng","img":"assets/img/ringan.png"},
        {"ind":"lebar","ter":"ambane","img":"assets/img/lebar.png"},
        {"ind":"sempit","ter":"sempit","img":"assets/img/sempit.png"},
        {"ind":"tebal","ter":"kandel","img":"assets/img/tebal.png"},
        {"ind":"tipis","ter":"tipis","img":"assets/img/tipis.png"},
        {"ind":"kuat","ter":"kuat","img":"assets/img/kuat.png"},
        {"ind":"lemah","ter":"ringkih","img":"assets/img/lemah.png"}
      ],
      "Warna": [
        {"ind":"merah","ter":"abang","img":"assets/img/merah.png"},
        {"ind":"biru","ter":"biru","img":"assets/img/biru.png"},
        {"ind":"kuning","ter":"kuning","img":"assets/img/kuning.png"},
        {"ind":"hijau","ter":"ijo","img":"assets/img/hijau.png"},
        {"ind":"hitam","ter":"ireng","img":"assets/img/hitam.png"},
        {"ind":"putih","ter":"putih","img":"assets/img/putih.png"},
        {"ind":"abu-abu","ter":"abu-abu","img":"assets/img/abu_abu.png"},
        {"ind":"coklat","ter":"coklat","img":"assets/img/coklat.png"},
        {"ind":"jingga","ter":"oranye","img":"assets/img/jingga.png"},  
        {"ind":"ungu","ter":"ungu","img":"assets/img/ungu.png"},
        {"ind":"merah muda","ter":"abang jambu","img":"assets/img/merah_muda.png"},
        {"ind":"emas","ter":"emas","img":"assets/img/emas.png"},
        {"ind":"perak","ter":"perak","img":"assets/img/perak.png"},
        {"ind":"transparan","ter":"tembus pandang","img":"assets/img/transparan.png"},
        {"ind":"warna-warni","ter":"warna-warni","img":"assets/img/warna_warni.png"},
        {"ind":"pink","ter":"pink","img":"assets/img/pink.png"}
      ],
      "Bentuk": [
        {"ind":"bulat","ter":"bunder","img":"assets/img/bulat.png"},
        {"ind":"persegi","ter":"persegi","img":"assets/img/persegi.png"},
        {"ind":"persegi panjang","ter":"persegi dawa","img":"assets/img/persegi_panjang.png"},
        {"ind":"segitiga","ter":"segitiga","img":"assets/img/segitiga.png"},
        {"ind":"oval","ter":"oval","img":"assets/img/oval.png"},
        {"ind":"bentuk hati","ter":"bentuk wedi","img":"assets/img/hati.png"},
        {"ind":"bintang","ter":"lintang","img":"assets/img/bintang.png"},
        {"ind":"lancip","ter":"runcing","img":"assets/img/lancip.png"},
        {"ind":"tumpul","ter":"tumpul","img":"assets/img/tumpul.png"},
        {"ind":"bergelombang","ter":"ombak-ombak","img":"assets/img/bergelombang.png"},
        {"ind":"berbintik","ter":"bintik-bintik","img":"assets/img/berbintik.png"},
        {"ind":"bergaris","ter":"garis-garis","img":"assets/img/bergaris.png"},
        {"ind":"bermotif","ter":"motif-motif","img":"assets/img/bermotif.png"},
        {"ind":"bertekstur","ter":"tekstur-tekstur","img":"assets/img/bertekstur.png"}
      ],
      "Keadaan/Perasaan": [
        {"ind":"senang","ter":"seneng","img":"assets/img/senang.png"},
        {"ind":"sedih","ter":"sedhih","img":"assets/img/sedih.png"},
        {"ind":"marah","ter":"marah","img":"assets/img/marah.png"},
        {"ind":"takut","ter":"wedhi","img":"assets/img/takut.png"},   
        {"ind":"malu","ter":"isin","img":"assets/img/malu.png"},
        {"ind":"bangga","ter":"bangga","img":"assets/img/bangga.png"},
        {"ind":"lelah","ter":"kepenak","img":"assets/img/lelah.png"},
        {"ind":"bosan","ter":"bosen","img":"assets/img/bosan.png"},
        {"ind":"terkejut","ter":"kaget","img":"assets/img/terkejut.png"},
        {"ind":"jijik","ter":"mual","img":"assets/img/jijik.png"},
        {"ind":"pusing","ter":"pusing","img":"assets/img/pusing.png"},
        {"ind":"lapar","ter":"luwe","img":"assets/img/lapar.png"},
        {"ind":"haus","ter":"ngelak","img":"assets/img/haus.png"},
        {"ind":"kenyang","ter":"wareg","img":"assets/img/kenyang.png"},
        {"ind":"sehat","ter":"sehat","img":"assets/img/sehat.png"},
        {"ind":"sakit","ter":"sakit","img":"assets/img/sakit.png"},
        {"ind":"capek","ter":"capek","img":"assets/img/capek.png"},
        {"ind":"kaya","ter":"kaya","img":"assets/img/kaya.png"},
        {"ind":"miskin","ter":"miskin","img":"assets/img/miskin.png"},
        {"ind":"bersih","ter":"resik","img":"assets/img/bersih.png"},
        {"ind":"kotor","ter":"reged","img":"assets/img/kotor.png"},
        {"ind":"ramai","ter":"ramai","img":"assets/img/ramai.png"},
        {"ind":"sepi","ter":"sepi","img":"assets/img/sepi.png"},
        {"ind":"sibuk","ter":"sibuk","img":"assets/img/sibuk.png"},
        {"ind":"tenang","ter":"tentrem","img":"assets/img/tenang.png"}
      ],
      "Rasa": [
        {"ind":"manis","ter":"legit","img":"assets/img/manis.png"},
        {"ind":"asin","ter":"asin","img":"assets/img/asin.png"},
        {"ind":"asam","ter":"asem","img":"assets/img/asam.png"},      
        {"ind":"pahit","ter":"pait","img":"assets/img/pahit.png"},
        {"ind":"pedas","ter":"pedhes","img":"assets/img/pedas.png"},
        {"ind":"segar","ter":"seger","img":"assets/img/segar.png"},
        {"ind":"bau","ter":"ambune","img":"assets/img/bau.png"},
        {"ind":"harum","ter":"wangi","img":"assets/img/harum.png"},
        {"ind":"lembut","ter":"alus","img":"assets/img/lembut.png"},
        {"ind":"kasar","ter":"kekar","img":"assets/img/kasar.png"},
        {"ind":"licin","ter":"licin","img":"assets/img/licin.png"},
        {"ind":"lengket","ter":"lengket","img":"assets/img/lengket.png"},
        {"ind":"kering","ter":"garing","img":"assets/img/kering.png"},
        {"ind":"basah","ter":"basa","img":"assets/img/basah.png"},
        {"ind":"berminyak","ter":"minyakan","img":"assets/img/berminyak.png"},
        {"ind":"berbusa","ter":"busa-busa","img":"assets/img/berbusa.png"},
        {"ind":"berdebu","ter":"debu-debu","img":"assets/img/berdebu.png"},
        {"ind":"berpasir","ter":"pasir-pasir","img":"assets/img/berpasir.png"}
      ],
      "Kondisi": [
        {"ind":"panas","ter":"panas","img":"assets/img/panas.png"},
        {"ind":"dingin","ter":"adhem","img":"assets/img/dingin.png"},
        {"ind":"hangat","ter":"anget","img":"assets/img/hangat.png"},
        {"ind":"kering","ter":"kering","img":"assets/img/kering.png"},
        {"ind":"basah","ter":"basa","img":"assets/img/basah.png"},
        {"ind":"berangin","ter":"anginan","img":"assets/img/berangin.png"},
        {"ind":"berawan","ter":"udanan","img":"assets/img/berawan.png"},
        {"ind":"hujan","ter":"udan","img":"assets/img/hujan.png"},
        {"ind":"cerah","ter":"cerah","img":"assets/img/cerah.png"},
        {"ind":"berpetir","ter":"badhog","img":"assets/img/berpetir.png"},
        {"ind":"berkilat","ter":"kilat","img":"assets/img/berkilat.png"},
        {"ind":"licin","ter":"licin","img":"assets/img/licin.png"},
        {"ind":"kasar","ter":"kasar","img":"assets/img/kasar.png"},
        {"ind":"halus","ter":"halus","img":"assets/img/halus.png"},
        {"ind":"kuat","ter":"kuat","img":"assets/img/kuat.png"},
        {"ind":"lemah","ter":"ringkih","img":"assets/img/lemah.png"},
        {"ind":"cepat","ter":"cepat","img":"assets/img/cepat.png"},
        {"ind":"lambat","ter":"alot","img":"assets/img/lambat.png"},
        {"ind":"bersih","ter":"resik","img":"assets/img/bersih.png"},
        {"ind":"kotor","ter":"reged","img":"assets/img/kotor.png"},
        {"ind":"rapi","ter":"rapi","img":"assets/img/rapi.png"},
        {"ind":"berantakan","ter":"amburadul","img":"assets/img/berantakan.png"},
        {"ind":"terang","ter":"padhang","img":"assets/img/terang.png"},
        {"ind":"gelap","ter":"peteng","img":"assets/img/gelap.png"},
        {"ind":"lucu","ter":"lucu","img":"assets/img/lucu.png"},
        {"ind":"aneh","ter":"aneh","img":"assets/img/aneh.png"},
        {"ind":"indah","ter":"endah","img":"assets/img/indah.png"},
        {"ind":"cantik","ter":"ayune","img":"assets/img/cantik.png"},
        {"ind":"tampan","ter":"ganteng","img":"assets/img/tampan.png"},
        {"ind":"jelek","ter":"jorok","img":"assets/img/jelek.png"},
        {"ind":"bagus","ter":"apik","img":"assets/img/bagus.png"},
        {"ind":"buruk","ter":"ala","img":"assets/img/buruk.png"},
        {"ind":"mendung","ter":"mendung","img":"assets/img/mendung.png"},
        {"ind":"rapi","ter":"rapi","img":"assets/img/rapi.png"},
        {"ind":"baru","ter":"anyar","img":"assets/img/baru.png"},
        {"ind":"lama","ter":"lawas","img":"assets/img/lama.png"},
        {"ind":"rusak","ter":"rusak","img":"assets/img/rusak.png"},
        {"ind":"patah","ter":"pecah","img":"assets/img/patah.png"}
      ],
      "Karakter": [
        {"ind":"baik","ter":"apik","img":"assets/img/baik.png"},
        {"ind":"jahat","ter":"ala","img":"assets/img/jahat.png"},
        {"ind":"ramah","ter":"ramah","img":"assets/img/ramah.png"},
        {"ind":"pendiam","ter":"meneng","img":"assets/img/pendiam.png"},
        {"ind":"sombong","ter":"sombong","img":"assets/img/sombong.png"},
        {"ind":"pemalu","ter":"isin","img":"assets/img/pemalu.png"},
        {"ind":"jujur","ter":"jujur","img":"assets/img/jujur.png"},
        {"ind":"sopan","ter":"sopan","img":"assets/img/sopan.png"},
        {"ind":"kasar","ter":"kekar","img":"assets/img/kasar.png"},
        {"ind":"nakal","ter":"nakal","img":"assets/img/nakal.png"},
        {"ind":"marah","ter":"marah","img":"assets/img/marah.png"},
        {"ind":"senang","ter":"senang","img":"assets/img/senang.png"},
        {"ind":"sedih","ter":"sedhih","img":"assets/img/sedih.png"},
        {"ind":"bohong","ter":"goroh","img":"assets/img/bohong.png"},
        {"ind":"pembohong","ter":"pembohong","img":"assets/img/pembohong.png"},
        {"ind":"rajin","ter":"rajin","img":"assets/img/rajin.png"},
        {"ind":"malas","ter":"malas","img":"assets/img/malas.png"},
        {"ind":"pintar","ter":"pinter","img":"assets/img/pintar.png"},
        {"ind":"bodoh","ter":"bego","img":"assets/img/bodoh.png"},
        {"ind":"berani","ter":"berani","img":"assets/img/berani.png"},
        {"ind":"penakut","ter":"wedi","img":"assets/img/penakut.png"},
        {"ind":"setia","ter":"setia","img":"assets/img/setia.png"},
        {"ind":"pengkhianat","ter":"pengkhianat","img":"assets/img/pengkhianat.png"},
        {"ind":"sabar","ter":"sabar","img":"assets/img/sabar.png"},
        {"ind":"pemarah","ter":"pemarah","img":"assets/img/pemarahan.png"},
        {"ind":"pemaaf","ter":"pemaaf","img":"assets/img/pemaaf.png"},
        {"ind":"toleran","ter":"toleran","img":"assets/img/toleran.png"},
        {"ind":"pendendam","ter":"pendendam","img":"assets/img/pendendam.png"},
        {"ind":"dermawan","ter":"dermawan","img":"assets/img/dermawan.png"},
        {"ind":"pelit","ter":"pelit","img":"assets/img/pelit.png"},
        {"ind":"optimis","ter":"optimis","img":"assets/img/optimis.png"},
        {"ind":"pesimis","ter":"pesimis","img":"assets/img/pesimis.png"},
        {"ind":"bijaksana","ter":"bijaksana","img":"assets/img/bijaksana.png"}
      ], 
      
    },
    "Kata Ganti": {
      "orang": [
        {"ind":"saya","ter":"me","img":"assets/img/saya.png"},
        {"ind":"aku","ter":"ku","img":"assets/img/aku.png"},
        {"ind":"kamu","ter":"kowe","img":"assets/img/kamu.png"},
        {"ind":"anda","ter":"sampeyan","img":"assets/img/anda.png"},
        {"ind":"dia (laki-laki)","ter":"dheweke (lanang)","img":"assets/img/dia_laki.png"},
        {"ind":"dia (perempuan)","ter":"dheweke (wadon)","img":"assets/img/dia_perempuan.png"},   
        {"ind":"kami","ter":"kita","img":"assets/img/kami.png"},
        {"ind":"kita","ter":"kita","img":"assets/img/kita.png"},
        {"ind":"mereka","ter":"dheweke","img":"assets/img/mereka.png"},
        {"ind":"siapa","ter":"sopo","img":"assets/img/siapa.png"},
        {"ind":"semua orang","ter":"kabeh wong","img":"assets/img/semua_orang.png"},
        {"ind":"setiap orang","ter":"saben wong","img":"assets/img/setiap_orang.png"},
        {"ind":"orang lain","ter":"wong liya","img":"assets/img/orang_lain.png"},
        {"ind":"teman","ter":"kanca","img":"https://d26e3f10zvrezp.cloudfront.net/Gallery/526a94a0-3c88-43d2-adea-6bf214c7fea5-1024x1024.webp"},
        {"ind":"teman laki-laki","ter":"kanca lanang","img":"assets/img/teman_laki.png"},
        {"ind":"teman perempuan","ter":"kanca wadon","img":"assets/img/teman_perempuan.png"}
      ],
      "Kepemilikan": [
        {"ind":"milik saya","ter":"duwe aku","img":"assets/img/milik_saya.png"},
        {"ind":"milikku","ter":"duwe aku","img":"assets/img/milikku.png"},
        {"ind":"milikmu","ter":"duwe kowe","img":"assets/img/milikmu.png"},
        {"ind":"miliknya (laki-laki)","ter":"lanang","img":"assets/img/miliknya_laki.png"},
        {"ind":"miliknya (perempuan)","ter":"wadon","img":"assets/img/miliknya_perempuan.png"},
        {"ind":"milik kita/kami","ter":"duwe kita","img":"assets/img/milik_kita.png"},
        {"ind":"milik mereka","ter":"duwe dheweke","img":"assets/img/milik_mereka.png"},
        {"ind":"milik orang itu","ter":"duwe wong kuwi","img":"assets/img/milik_orang_itu.png"},
        {"ind":"milik siapa","ter":"duwe sopo","img":"assets/img/milik_siapa.png"},
        {"ind":"milik teman","ter":"duwe kanca","img":"assets/img/milik_teman.png"},
        {"ind":"milik","ter":"duwe","img":"assets/img/milik.png"}
      ],
      "Penunjuk": [
        {"ind":"ini","ter":"iki","img":"assets/img/ini.png"},
        {"ind":"itu","ter":"kuwi","img":"assets/img/itu.png"},
        {"ind":"sini","ter":"mriki","img":"assets/img/sini.png"},
        {"ind":"situ","ter":"mrana","img":"assets/img/situ.png"},
        {"ind":"sana","ter":"mrana","img":"assets/img/sana.png"},
        {"ind":"atas","ter":"atas","img":"assets/img/atas.png"},
        {"ind":"bawah","ter":"ngisor","img":"assets/img/bawah.png"},
        {"ind":"depan","ter":"ngarep","img":"assets/img/depan.png"},
        {"ind":"belakang","ter":"mburi","img":"assets/img/belakang.png"},
        {"ind":"dalam","ter":"jeru","img":"assets/img/dalam.png"},
        {"ind":"luar","ter":"njaba","img":"assets/img/luar.png"},
        {"ind":"sebelah","ter":"samping","img":"assets/img/sebelah.png"},
        {"ind":"samping","ter":"samping","img":"assets/img/samping.png"},
        {"ind":"tengah","ter":"tengah","img":"assets/img/tengah.png"}
      ],
      "Tanya": [
        {"ind":"siapa","ter":"sopo","img":"assets/img/siapa.png"},
        {"ind":"apa","ter":"apa","img":"assets/img/apa.png"},
        {"ind":"dimana","ter":"dimana","img":"assets/img/dimana.png"},
        {"ind":"kenapa","ter":"kenapa","img":"assets/img/kenapa.png"},
        {"ind":"mana","ter":"endi","img":"assets/img/mana.png"},
        {"ind":"mengapa","ter":"ngopo","img":"assets/img/mengapa.png"},
        {"ind":"bagaimana","ter":"kepriye","img":"assets/img/bagaimana.png"},
        {"ind":"kapan","ter":"kapan","img":"assets/img/kapan.png"},
        {"ind":"berapa","ter":"pira","img":"assets/img/berapa.png"}
      ],
      "Angka": [
        {"ind":"satu","ter":"siji","img":"assets/img/satu.png"},
        {"ind":"dua","ter":"loro","img":"assets/img/dua.png"},
        {"ind":"tiga","ter":"telu","img":"assets/img/tiga.png"},
        {"ind":"empat","ter":"papat","img":"assets/img/empat.png"},
        {"ind":"lima","ter":"limo","img":"assets/img/lima.png"},
        {"ind":"enam","ter":"enem","img":"assets/img/enam.png"},
        {"ind":"tujuh","ter":"pitu","img":"assets/img/tujuh.png"},
        {"ind":"delapan","ter":"wolu","img":"assets/img/delapan.png"},
        {"ind":"sembilan","ter":"sanga","img":"assets/img/sembilan.png"},
        {"ind":"sepuluh","ter":"sepuluh","img":"assets/img/sepuluh.png"},
        {"ind":"sebelas","ter":"sewelas","img":"assets/img/sebelas.png"},
        {"ind":"dua belas","ter":"rolas","img":"assets/img/dua_belas.png"},
        {"ind":"tiga belas","ter":"telulas","img":"assets/img/tiga_belas.png"}, 
        {"ind":"dua puluh","ter":"dua puluh","img":"assets/img/dua puluh.png"},
        {"ind":"tiga puluh","ter":"telu puluh","img":"assets/img/tiga_puluh.png"},
        {"ind":"empat puluh","ter":"papat puluh","img":"assets/img/empat_puluh.png"},
        {"ind":"lima puluh","ter":"limo puluh","img":"assets/img/lima_puluh.png"},
        {"ind":"seratus","ter":"satus","img":"assets/img/seratus.png"},
        {"ind":"seribu","ter":"sewu","img":"assets/img/seribu.png"},
        {"ind":"satu juta","ter":"siji yuta","img":"assets/img/satu_juta.png"},
        {"ind":"nol","ter":"nol","img":"assets/img/nol.png"},
        {"ind":"nol (angka)","ter":"nol","img":"assets/img/nol_angka.png"},
        {"ind":"angka","ter":"angka","img":"assets/img/angka.png"},
        {"ind":"angka-angka","ter":"angka-angka","img":"assets/img/angka_angka.png"},
        {"ind":"satuan","ter":"satuan","img":"assets/img/satuan.png"},
        {"ind":"belasan","ter":"belasan","img":"assets/img/belasan.png"},
        {"ind":"belas","ter":"belas","img":"assets/img/belas.png"},
        {"ind":"puluhan","ter":"puluhan","img":"assets/img/puluhan.png"},
        {"ind":"puluh","ter":"puluh","img":"assets/img/puluh.png"},
        {"ind":"ratusan","ter":"atusan","img":"assets/img/ratusan.png"},
        {"ind":"ratus","ter":"atus","img":"assets/img/ratus.png"},
        {"ind":"ribuan","ter":"ewuhan","img":"assets/img/ribuan.png"},
        {"ind":"ribu","ter":"ewu","img":"assets/img/ribu.png"},
        {"ind":"jutaan","ter":"jutaan","img":"assets/img/jutaan.png"},
        {"ind":"juta","ter":"juta","img":"assets/img/juta.png"},
        {"ind":"miliaran","ter":"miliaran","img":"assets/img/miliaran.png"},
        {"ind":"miliar","ter":"miliar","img":"assets/img/miliar.png"},
        {"ind":"triliunan","ter":"triliunan","img":"assets/img/triliunan.png"},
        {"ind":"triliun","ter":"triliun","img":"assets/img/triliun.png"}
      ],
      "Bilangan Ordinal": [
        {"ind":"pertama","ter":"sepisan","img":"assets/img/pertama.png"},
        {"ind":"kedua","ter":"kapindho","img":"assets/img/kedua.png"},
        {"ind":"ketiga","ter":"katelu","img":"assets/img/ketiga.png"},
        {"ind":"keempat","ter":"kapapat","img":"assets/img/keempat.png"},
        {"ind":"kelima","ter":"kalimo","img":"assets/img/kelima.png"},
        {"ind":"keenam","ter":"kaenem","img":"assets/img/keenam.png"},   
        {"ind":"ketujuh","ter":"kapitu","img":"assets/img/ketujuh.png"},
        {"ind":"kedelapan","ter":"kawolu","img":"assets/img/kedelapan.png"},
        {"ind":"kesembilan","ter":"kasanga","img":"assets/img/kesembilan.png"},
        {"ind":"kesepuluh","ter":"kasepuluh","img":"assets/img/kesepuluh.png"},
        {"ind":"kesebelas","ter":"kasuwelas","img":"assets/img/kesebelas.png"},
        {"ind":"kedua belas","ter":"kalolas","img":"assets/img/kedua_belas.png"},
        {"ind":"keseratus","ter":"keseratus","img":"assets/img/keseratus.png"},
        {"ind":"keseribu","ter":"kesewu","img":"assets/img/keseribu.png"}
      ],
      "Lain-Lain": [
        {"ind":"banyak","ter":"akeh","img":"assets/img/banyak.png"},
        {"ind":"sedikit","ter":"sethithik","img":"assets/img/sedikit.png"},
        {"ind":"beberapa","ter":"sawetara","img":"assets/img/beberapa.png"},
        {"ind":"sejumlah","ter":"sejumlah","img":"assets/img/sejumlah.png"},
        {"ind":"seluruh","ter":"sakabehe","img":"assets/img/seluruh.png"},
        {"ind":"setiap","ter":"saben","img":"assets/img/setiap.png"},
        {"ind":"semua","ter":"kabeh","img":"assets/img/semua.png"},
        {"ind":"tiap","ter":"saben","img":"assets/img/tiap.png"},
        {"ind":"lainnya","ter":"liyane","img":"assets/img/lainnya.png"}
      ],
    },
    "Kata Keterangan": {
      "Waktu": [
        {"ind":"sekarang","ter":"saiki","img":"assets/img/sekarang.png"},
        {"ind":"nanti","ter":"mengko","img":"assets/img/nanti.png"},
        {"ind":"kemarin","ter":"wingi","img":"assets/img/kemarin.png"},
        {"ind":"besok","ter":"sesuk","img":"assets/img/besok.png"},
        {"ind":"lusa","ter":"sawise sesuk","img":"assets/img/lusa.png"},
        {"ind":"tadi","ter":"wengi","img":"assets/img/tadi.png"},
        {"ind":"dulu","ter":"dulu","img":"assets/img/dulu.png"},
        {"ind":"sebentar","ter":"sebentar","img":"assets/img/sebentar.png"},
        {"ind":"segera","ter":"enggal","img":"assets/img/segera.png"},
        {"ind":"sudah","ter":"sudah","img":"assets/img/sudah.png"},
        {"ind":"belum","ter":"belum","img":"assets/img/belum.png"},
        {"ind":"selalu","ter":"tansah","img":"assets/img/selalu.png"},
        {"ind":"sering","ter":"asring","img":"assets/img/sering.png"},
        {"ind":"kadang-kadang","ter":"kadhang-kadhang","img":"assets/img/kadang_kadang.png"},
        {"ind":"jarang","ter":"jarang","img":"assets/img/jarang.png"},
        {"ind":"tidak pernah","ter":"ora tau","img":"assets/img/tidak_pernah.png"},
        {"ind":"setelah","ter":"sawise","img":"assets/img/setelah.png"},
        {"ind":"sebelum","ter":"sadurunge","img":"assets/img/sebelum.png"},
        {"ind":"selama","ter":"sajrone","img":"assets/img/selama.png"},
        {"ind":"sementara","ter":"sawetara","img":"assets/img/sementara.png"},
        {"ind":"baru saja","ter":"bar wae","img":"assets/img/baru_saja.png"},
        {"ind":"lama","ter":"suwe","img":"assets/img/lama.png"},
        {"ind":"tiba-tiba","ter":"kedadak","img":"assets/img/tiba_tiba.png"},
        {"ind":"akhirnya","ter":"pungkasane","img":"assets/img/akhirnya.png"},
        {"ind":"selanjutnya","ter":"sabanjure","img":"assets/img/selanjutnya.png"},
        {"ind":"terakhir","ter":"pungkasan","img":"assets/img/terakhir.png"}
      ],
      "Cara": [
        {"ind":"pelan-pelan","ter":"pelan-pelan","img":"assets/img/pelan-pelan.png"},
        {"ind":"cepat","ter":"cepat","img":"assets/img/cepat.png"},
        {"ind":"diam-diam","ter":"diam-diam","img":"assets/img/diam-diam.png"},
        {"ind":"sungguh-sungguh","ter":"sungguh-sungguh","img":"assets/img/sungguh-sungguh.png"},
        {"ind":"sembarangan","ter":"sembarangan","img":"assets/img/sembarangan.png"},
        {"ind":"sepenuhnya","ter":"sepenuhnya","img":"assets/img/sepenuhnya.png"},
        {"ind":"terburu-buru","ter":"keburu-keburu","img":"assets/img/terburu-buru.png"},
        {"ind":"hati-hati","ter":"ati-ati","img":"assets/img/hati-hati.png"},
        {"ind":"berani-berani","ter":"berani-berani","img":"assets/img/berani-berani.png"},
        {"ind":"setengah-setengah","ter":"setengah-setengah","img":"assets/img/setengah-setengah.png"},
        {"ind":"setengah","ter":"setengah","img":"assets/img/setengah.png"},
        {"ind":"sambil","ter":"sambil","img":"assets/img/sambil.png"},
        {"ind":"sendirian","ter":"dewekan","img":"assets/img/sendirian.png"},
        {"ind":"bersama-sama","ter":"bareng-bareng","img":"assets/img/bersama-sama.png"},
        {"ind":"terus-menerus","ter":"terus-terusan","img":"assets/img/terus-menerus.png"},
        {"ind":"sekali-sekali","ter":"sawijining-sawijining","img":"assets/img/sekali-sekali.png"},
        {"ind":"sedikit demi sedikit","ter":"sethithik demi sethithik","img":"assets/img/sedikit_demi_sedikit.png"},
        {"ind":"perlahan-lahan","ter":"alon-alon","img":"assets/img/perlahan-lahan.png"},
        {"ind":"mudah","ter":" gampang","img":"assets/img/dengan_mudah.png"},
        {"ind":"susah payah","ter":" susah payah","img":"assets/img/dengan_susah.png"}
      ],
      "Derajat": [
        {"ind":"sangat","ter":"sangat","img":"assets/img/sangat.png"},
        {"ind":"terlalu","ter":"kakehan","img":"assets/img/terlalu.png"},
        {"ind":"cukup","ter":"cukup","img":"assets/img/cukup.png"},
        {"ind":"agak","ter":"agak","img":"assets/img/agak.png"},
        {"ind":"sedikit","ter":"sethithik","img":"assets/img/sedikit.png"},
        {"ind":"lebih","ter":"luwih","img":"assets/img/lebih.png"},
        {"ind":"paling","ter":"paling","img":"assets/img/paling.png"},
        {"ind":"kurang","ter":"kurang","img":"assets/img/kurang.png"},
        {"ind":"hampir","ter":"meh","img":"assets/img/hampir.png"},
        {"ind":"hampir saja","ter":"meh wae","img":"assets/img/hampir_saja.png"},
        {"ind":"sebenarnya","ter":"sakjane","img":"assets/img/sebenarnya.png"},
        {"ind":"betul-betul","ter":"temenan","img":"assets/img/betul-betul.png"},
        {"ind":"pasti","ter":"pasti","img":"assets/img/pasti.png"},
        {"ind":"mungkin","ter":"mbok menawa","img":"assets/img/mungkin.png"},
        {"ind":"barangkali","ter":"barangkali","img":"assets/img/barangkali.png"},    
        {"ind":"tentu","ter":"mesthi","img":"assets/img/tentu.png"},
        {"ind":"sejauh","ter":"sajauh","img":"assets/img/sejauh.png"},
        {"ind":"sedalam","ter":"sedalam","img":"assets/img/sedalam.png"},
        {"ind":"setinggi","ter":"setinggi","img":"assets/img/setinggi.png"},
        {"ind":"serendah","ter":"srendah","img":"assets/img/serendah.png"},
        {"ind":"secepat","ter":"secepat","img":"assets/img/secepat.png"},
        {"ind":"selambat","ter":"selambat","img":"assets/img/selambat.png"},
        {"ind":"sebaik","ter":"sebaik","img":"assets/img/sebaik.png"},
        {"ind":"seburuk","ter":"seburuk","img":"assets/img/seburuk.png"}
      ],
      "Frekuensi": [
        {"ind":"sekali","ter":"sekali","img":"assets/img/sekali.png"},
        {"ind":"dua kali","ter":"loro kaping","img":"assets/img/dua_kali.png"},
        {"ind":"selalu","ter":"selalu","img":"assets/img/selalu.png"},
        {"ind":"sering","ter":"asring","img":"assets/img/sering.png"},
        {"ind":"kadang-kadang","ter":"kadhang-kadhang","img":"assets/img/kadang_kadang.png"},
        {"ind":"jarang","ter":"jarang","img":"assets/img/jarang.png"},
        {"ind":"berulangkali","ter":"berulangkali","img":"assets/img/berulangkali.png"},
        {"ind":"tidak pernah","ter":"ora tau","img":"assets/img/tidak_pernah.png"}
      ],
      "Afirmasi & Nagasi": [
        {"ind":"ya","ter":"ya","img":"assets/img/ya.png"},
        {"ind":"iya","ter":"iyo","img":"assets/img/iya.png"},
        {"ind":"benar","ter":"bener","img":"assets/img/benar.png"},
        {"ind":"setuju","ter":"setuju","img":"assets/img/setuju.png"},
        {"ind":"tidak","ter":"ora","img":"assets/img/tidak.png"},
        {"ind":"bukan","ter":"dudu","img":"assets/img/bukan.png"},
        {"ind":"mungkin","ter":"mbok menawa","img":"assets/img/mungkin.png"},
        {"ind":"barangkali","ter":"barangkali","img":"assets/img/barangkali.png"},    
        {"ind":"tentu","ter":"mesthi","img":"assets/img/tentu.png"},
        {"ind":"pasti","ter":"pasti","img":"assets/img/pasti.png"},
        {"ind":"sebenarnya","ter":"sakjane","img":"assets/img/sebenarnya.png"},
        {"ind":"betul-betul","ter":"temenan","img":"assets/img/betul-betul.png"},
        {"ind":"tidak juga","ter":"ora uga","img":"assets/img/tidak_juga.png"},
        {"ind":"jangan","ter":"aja","img":"assets/img/jangan.png"},
        {"ind":"jangan sampai","ter":"aja nganti","img":"assets/img/jangan_sampai.png"},
        {"ind":"belum tentu","ter":"durung mesthi","img":"assets/img/belum_tentu.png"}
      ],
    },
    "Preposisi": {
      "Kata Depan": [
        {"ind":"di","ter":"ning","img":"assets/img/di.png"},
        {"ind":"ke","ter":"kes","img":"assets/img/ke.png"},
        {"ind":"dari","ter":"saka","img":"assets/img/dari.png"},
        {"ind":"dengan","ter":"karo","img":"assets/img/dengan.png"},
        {"ind":"untuk","ter":"kanggo","img":"assets/img/untuk.png"},
        {"ind":"tentang","ter":"babagan","img":"assets/img/tentang.png"},
        {"ind":"pada","ter":"ing","img":"assets/img/pada.png"},
        {"ind":"seperti","ter":"kaya","img":"assets/img/seperti.png"},
        {"ind":"tanpa","ter":"tanpa","img":"assets/img/tanpa.png"},
        {"ind":"antara","ter":"antara","img":"assets/img/antara.png"},
        {"ind":"selain","ter":"kajaba","img":"assets/img/selain.png"},
        {"ind":"melalui","ter":"liwat","img":"assets/img/melalui.png"},
        {"ind":"menurut","ter":"miturut","img":"assets/img/menurut.png"},
        {"ind":"terhadap","ter":"ngadhepi","img":"assets/img/terhadap.png"},
        {"ind":"sejak","ter":"wiwit","img":"assets/img/sejak.png"},
        {"ind":"sampai","ter":"nganti","img":"assets/img/sampai.png"},
        {"ind":"selama","ter":"sajrone","img":"assets/img/selama.png"},
        {"ind":"oleh","ter":"déning","img":"assets/img/oleh.png"},
        {"ind":"guna","ter":"guna","img":"assets/img/guna.png"},
        {"ind":"seperti","ter":"seperti","img":"assets/img/seperti.png"},
        {"ind":"sebagai","ter":"sebagai","img":"assets/img/sebagai.png"},
        {"ind":"ibarat","ter":"ibarat","img":"assets/img/ibarat.png"},
        {"ind":"layaknya","ter":"kaya dene","img":"assets/img/layaknya.png"},
        {"ind":"seolah-olah","ter":"kaya dene","img":"assets/img/seolah_olah.png"},
        {"ind":"sebagaimana","ter":"sebagaimana","img":"assets/img/sebagaimana.png"}
      ],
     
    },
    "Konjungsi": {
      "Kata Sambung": [
        {"ind":"dan","ter":"lan","img":"assets/img/dan.png"},
        {"ind":"atau","ter":"utawa","img":"assets/img/atau.png"},
        {"ind":"tetapi","ter":"nanging","img":"assets/img/tetapi.png"},
        {"ind":"karena","ter":"amarga","img":"assets/img/karena.png"},
        {"ind":"sehingga","ter":"saéngga","img":"assets/img/sehingga.png"},
        {"ind":"jika","ter":"yen","img":"assets/img/jika.png"},
        {"ind":"serta","ter":"serta","img":"assets/img/serta.png"},
        {"ind":"kalau","ter":"yen","img":"assets/img/kalau.png"},
        {"ind":"maupun","ter":"maupun","img":"assets/img/maupun.png"},
        {"ind":"sedangkan","ter":"sedangkan","img":"assets/img/sedangkan.png"},
        {"ind":"padahal","ter":"padahal","img":"assets/img/padahal.png"},
        {"ind":"malainkan","ter":"malainkan","img":"assets/img/malainkan.png"},
        {"ind":"meskipun","ter":"sanajan","img":"assets/img/meskipun.png"},
        {"ind":"walaupun","ter":"sanajan","img":"assets/img/walaupun.png"},
        {"ind":"sementara","ter":"dening","img":"assets/img/sementara.png"},
        {"ind":"lalu","ter":"banjur","img":"assets/img/lalu.png"},
        {"ind":"kemudian","ter":"banjur","img":"assets/img/kemudian.png"},
        {"ind":"selain itu","ter":"kajaba iku","img":"assets/img/selain_itu.png"},
        {"ind":"bahkan","ter":"malah","img":"assets/img/bahkan.png"},
        {"ind":"apalagi","ter":"apalagi","img":"assets/img/apalagi.png"},
        {"ind":"yaitu","ter":"yaiku","img":"assets/img/yaitu.png"},
        {"ind":"bahwa","ter":"menawa","img":"assets/img/bahwa.png"},
        {"ind":"supaya","ter":"supaya","img":"assets/img/supaya.png"},
        {"ind":"agar","ter":"supaya","img":"assets/img/agar.png"},
        {"ind":"sebab","ter":"amarga","img":"assets/img/sebab.png"},
        {"ind":"demi","ter":"demi","img":"assets/img/demi.png"},
        {"ind":"ayo","ter":"ayo","img":"assets/img/ayo.png"},
        {"ind":"biar","ter":"biar","img":"assets/img/biar.png"},
        {"ind":"bahwa","ter":"menawa","img":"assets/img/bahwa.png"}
      ],
      "Artikula":[
        {"ind":"si","ter":"si","img":"assets/img/si.png"},
        {"ind":"sang","ter":"sang","img":"assets/img/sang.png"},
        {"ind":"para","ter":"para","img":"assets/img/para.png"},
        {"ind":"yang","ter":"sing","img":"assets/img/yang.png"},
        {"ind":"sebuah","ter":"siji","img":"assets/img/sebuah.png"},
        {"ind":"seorang","ter":"siji","img":"assets/img/seorang.png"},
      ],
    },
    "Onomatope": {
      "Kata Tiruan Bunyi": [
        {"ind":"meong","ter":"meong","img":"assets/img/meong.png"},
        {"ind":"gonggong","ter":"guk-guk","img":"assets/img/gonggong.png"},
        {"ind":"kukuruyuk","ter":"kukuruyuk","img":"assets/img/kukuruyuk.png"},
        {"ind":"kring-kring","ter":"kring-kring","img":"assets/img/kring_kring.png"},
        {"ind":"ciap-ciap","ter":"ciap-ciap","img":"assets/img/ciap_ciap.png"},
        {"ind":"kwek-kwek","ter":"kwek-kwek","img":"assets/img/kwek_kwek.png"}
      ],
      "Bunyi Alam": [        
        {"ind":"gemericik","ter":"gemricik","img":"assets/img/gemericik.png"},
        {"ind":"gemuruh","ter":"gemuruh","img":"assets/img/gemuruh.png"},
        {"ind":"gempa","ter":"gempa","img":"assets/img/gempa.png"},
        {"ind":"deru","ter":"deru","img":"assets/img/deru.png"},
        {"ind":"deru-deru","ter":"deru-deru","img":"assets/img/deru_deru.png"},
        {"ind":"degup","ter":"degup","img":"assets/img/degup.png"}
      ],
    },
    "Kata sapaan": {
      "sebutan": [
        {"ind":"bapak","ter":"bapak","img":"assets/img/bapak.png"},
        {"ind":"ibu","ter":"ibu","img":"assets/img/ibu.png"},
        {"ind":"tuan","ter":"tuan","img":"assets/img/tuan.png"},
        {"ind":"mbak","ter":"mbak","img":"assets/img/mbak.png"},
        {"ind":"mas","ter":"mas","img":"assets/img/mas.png"},
        {"ind":"saudari (perempuan)","ter":"mbak","img":"assets/img/saudari_perempuan.png"},
        {"ind":"adik (laki-laki)","ter":"mas","img":"assets/img/adik_laki.png"},
        {"ind":"adik (perempuan)","ter":"mbak","img":"assets/img/adik_perempuan.png"}
      ],
      "Sapaan Biasa": [
        {"ind":"halo","ter":"halo","img":"assets/img/hallo.png"},
        {"ind":"hai","ter":"hai","img":"assets/img/hai.png"},
        {"ind":"selamat pagi","ter":"selamat enjing","img":"assets/img/selamat_pagi.png"},
        {"ind":"selamat siang","ter":"selamat awan","img":"assets/img/selamat_siang.png"},
        {"ind":"selamat sore","ter":"selamat sonten","img":"assets/img/selamat_sore.png"},
        {"ind":"selamat malam","ter":"selamat dalu","img":"assets/img/selamat_malam.png"},
        {"ind":"apa kabar?","ter":"piye kabarmu?","img":"assets/img/apa_kabar.png"},
        {"ind":"baik","ter":"apik","img":"assets/img/baik.png"},
        {"ind":"terima kasih","ter":"matur nuwun","img":"assets/img/terima_kasih.png"},
        {"ind":"sama-sama","ter":"sama-sama","img":"assets/img/sama_sama.png"},
        {"ind":"maaf","ter":"ngapunten","img":"assets/img/maaf.png"},
        {"ind":"permisi","ter":"permisi","img":"assets/img/permisi.png"},
        {"ind":"selamat tinggal","ter":"selamat tinggal","img":"assets/img/selamat_tinggal.png"},
        {"ind":"sampai jumpa","ter":"ketemu maneh","img":"assets/img/sampai_jumpa.png"},
        {"ind":"sampai nanti","ter":"ketemu mengko","img":"assets/img/sampai_nanti.png"},
        {"ind":"sampai besok","ter":"ketemu sesuk","img":"assets/img/sampai_besok.png"},
        {"ind":"selamat jalan","ter":"selamat dalu","img":"assets/img/selamat_jalan.png"},
        {"ind":"selamat beristirahat","ter":"selamat istirahat","img":"assets/img/selamat_beristirahat.png"},
        {"ind":"selamat bekerja","ter":"selamat makarya","img":"assets/img/selamat_bekerja.png"},
        {"ind":"selamat belajar","ter":"selamat sinau","img":"assets/img/selamat_belajar.png"},
        {"ind":"selamat makan","ter":"selamat dhahar","img":"assets/img/selamat_makan.png"},
        {"ind":"selamat ulang tahun","ter":"selamat ulang tahun","img":"assets/img/selamat_ulang_tahun.png"},
        {"ind":"selamat hari raya","ter":"selamat lebaran","img":"assets/img/selamat_hari_raya.png"},
        {"ind":"selamat natal","ter":"selamat natal","img":"assets/img/selamat_natal.png"},
        {"ind":"selamat tahun baru","ter":"selamat warsa anyar","img":"assets/img/selamat_tahun_baru.png"},
        {"ind":"selamat idul fitri","ter":"selamat idul fitri","img":"assets/img/selamat_idul_fitri.png"},
        {"ind":"selamat idul adha","ter":"selamat idul adha","img":"assets/img/selamat_idul_adha.png"}
      ],
    },
    "Kata Bantu": {
      "Kata Kerja Bantu": [
        {"ind":"coba","ter":"coba","img":"assets/img/coba.png"},
        {"ind":"sanggup","ter":"sanggup","img":"assets/img/sanggup.png"},
        {"ind":"sedang","ter":"sedang","img":"assets/img/sedang.png"},
        {"ind":"akan","ter":"bakal","img":"assets/img/akan.png"},
        {"ind":"telah","ter":"wis","img":"assets/img/telah.png"},
        {"ind":"sudah","ter":"sudah","img":"assets/img/sudah.png"},
        {"ind":"belum","ter":"durung","img":"assets/img/belum.png"},
        {"ind":"ingin","ter":"arep","img":"assets/img/ingin.png"},
        {"ind":"mesti","ter":"mesti","img":"assets/img/mesti.png"},
        {"ind":"harus","ter":"kudu","img":"assets/img/harus.png"},
        {"ind":"boleh","ter":"boleh","img":"assets/img/boleh.png"},
        {"ind":"mau","ter":"arep","img":"assets/img/mau.png"},
        {"ind":"perlu","ter":"perlu","img":"assets/img/perlu.png"},
        {"ind":"juga","ter":"uga","img":"assets/img/juga.png"},
        {"ind":"pun","ter":"uga","img":"assets/img/pun.png"},
        {"ind":"saja","ter":"wae","img":"assets/img/saja.png"},
        {"ind":"hanya","ter":"mung","img":"assets/img/hanya.png"},
        {"ind":"malah","ter":"malah","img":"assets/img/malah.png"},
        {"ind":"justru","ter":"justru","img":"assets/img/justru.png"},
        {"ind":"bahkan","ter":"malah","img":"assets/img/bahkan.png"},
        {"ind":"lagi","ter":"maneh","img":"assets/img/lagi.png"},
        {"ind":"terus","ter":"terus","img":"assets/img/terus.png"},
        {"ind":"tetap","ter":"tetep","img":"assets/img/tetap.png"},
        {"ind":"sampai","ter":"nganti","img":"assets/img/sampai.png"},
        {"ind":"punya","ter":"duwe","img":"assets/img/punya.png"},
        {"ind":"ada","ter":"ada","img":"assets/img/ada.png"},
        {"ind":"tidak ada","ter":"ora ana","img":"assets/img/tidak_ada.png"},
        {"ind":"dapat","ter":"dapat","img":"assets/img/dapat.png"},
        {"ind":"ingin","ter":"ingin","img":"assets/img/ingin.png"},
        {"ind":"menginginkan","ter":"menginginkan","img":"assets/img/menginginkan.png"},
        {"ind":"suka","ter":"seneng","img":"assets/img/suka.png"},
        {"ind":"benci","ter":"mbenci","img":"assets/img/benci.png"},
        {"ind":"tahu","ter":"ngerti","img":"assets/img/tahu.png"},
        {"ind":"mengerti","ter":"ngerti","img":"assets/img/mengerti.png"},
        {"ind":"percaya","ter":"percaya","img":"assets/img/percaya.png"},
        {"ind":"ingat","ter":"eling","img":"assets/img/ingat.png"},
        {"ind":"lupa","ter":"lali","img":"assets/img/lupa.png"},
        {"ind":"ingat-ingat","ter":"eling-eling","img":"assets/img/ingat_ingat.png"},
        {"ind":"cinta","ter":"tresna","img":"assets/img/cinta.png"},
        {"ind":"sayang","ter":"tresna","img":"assets/img/sayang.png"},
        {"ind":"pernah","ter":"tau","img":"assets/img/pernah.png"},
        {"ind":"bisa","ter":"bisa","img":"assets/img/bisa.png"},
        {"ind":"mampu","ter":"sanggup","img":"assets/img/mampu.png"},
        {"ind":"sanggup","ter":"sanggup","img":"assets/img/sanggup.png"},
        {"ind":"berani","ter":"berani","img":"assets/img/berani.png"},
        {"ind":"berada","ter":"berada","img":"assets/img/berada.png"}
      ]
    }
  };

  // ======================
  // Map kata/frasa
  // ======================
  const mapIdToTt=new Map(), mapTtToId=new Map();
  Object.entries(DICT).forEach(([cat,themes])=>{
    Object.entries(themes).forEach(([theme,arr])=>{
      (arr||[]).forEach(it=>{
        if(it.ind&&it.ter){
          mapIdToTt.set(it.ind.toLowerCase(),it.ter);
          mapTtToId.set(it.ter.toLowerCase(),it.ind);
        }
      });
    });
  });

  // ======================
  // Translasi multi kata/frasa
  // ======================
    function translateWithMap(text, dir){
    if(!text) return "";
    const dict = dir === 'id-to-tt' ? mapIdToTt : mapTtToId;

    // 🔧 Normalisasi ringan
    text = text.toLowerCase()
      .replace(/\s*-\s*/g, "-")   // rapikan tanda hubung
      .replace(/\s+/g, " ")       // hapus spasi ganda
      .trim();

    // 🔧 ubah regex agar tanda hubung tidak terpisah dari kata
    const tokens = text.match(/[a-zA-Z0-9-]+|[^\w\s]/g) || [];
    let out = [], i = 0;

    while (i < tokens.length) {
      let match = null, matchLen = 0;

      // coba cocokkan frasa paling panjang dulu (maks 9 kata)
      for (let len = Math.min(9, tokens.length - i); len > 0; len--) {
        const phrase = tokens.slice(i, i + len).join(" ");
        if (dict.has(phrase)) {
          match = dict.get(phrase);
          matchLen = len;
          break;
        }
      }

      if (match) {
        out.push(match);
        i += matchLen;
      } else {
        out.push(tokens[i]);
        i++;
      }
    }

    return out.join(" ");
  }


  // ======================
  // GPT API
  // ======================
  async function callOpenAIcorrect(text){
    const system='Kamu adalah korektor tata bahasa Indonesia. Jawab hanya kalimat hasil perbaikan, tanpa tambahan kata lain.';
    const body={
      model:(typeof OPENAI_MODEL!=='undefined'?OPENAI_MODEL:'gpt-4o-mini'),
      messages:[
        {role:'system',content:system},
        {role:'user',content:`Perbaiki kalimat ini: "${text}"`}
      ],
      temperature:0
    };
    const resp=await fetch((typeof API_PROXY_URL!=='undefined'?API_PROXY_URL:'/api/correct'),{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(body)
    });
    if(!resp.ok) throw new Error('Proxy '+resp.status);
    const j=await resp.json();
    return j?.choices?.[0]?.message?.content?.trim()||text;
  }

  // ======================
  // Render kategori & card (dengan suara klik / dblklik)
  // ======================
  function renderCategory(category, theme){
    const cont = $('categoryContainer');
    cont.innerHTML='';
    if(!category || !theme) return;

    const list = (DICT[category] && DICT[category][theme]) || [];
    list.forEach(it=>{
      const card=document.createElement('div');
      card.className='card';
      card.style.width='10rem';
      card.innerHTML=`
        ${it.img?`<img src="${it.img}" class="card-img-top" alt="${it.ind}">`:''}
        <div class="card-body text-center">
          <h5 class="card-title">${it.ind}</h5>
          <p class="card-text"><em>${it.ter}</em></p>
        </div>`;

      let clickTimer=null;

      card.addEventListener('click', ()=>{
        if(clickTimer){ clearTimeout(clickTimer); clickTimer=null; }
        clickTimer=setTimeout(()=>{
          // suara Indonesia
          const u = new SpeechSynthesisUtterance(it.ind);
          u.lang = "id-ID";
          speechSynthesis.cancel();
          speechSynthesis.speak(u);
          clickTimer=null;
        }, 250); // tunggu 250ms, kalau tidak ada klik kedua → jalan
      });

      card.addEventListener('dblclick', ()=>{
        if(clickTimer){ clearTimeout(clickTimer); clickTimer=null; }
        // suara Ternate
        const u = new SpeechSynthesisUtterance(it.ter);
        u.lang = "id-ID"; // belum ada dukungan khusus Ternate
        speechSynthesis.cancel();
        speechSynthesis.speak(u);
      });

      cont.appendChild(card);
    });
  }


  // ======================
  // Pencarian kata
  // ======================
  function renderFilter(query){
    const cont=$('categoryContainer');
    cont.innerHTML='';
    query=query.toLowerCase();
    Object.entries(DICT).forEach(([cat,themes])=>{
      Object.entries(themes).forEach(([theme,list])=>{
        list.forEach(it=>{
          if(it.ind.toLowerCase().includes(query) || it.ter.toLowerCase().includes(query)){
            const card=document.createElement('div');
            card.className='card';
            card.style.width='10rem';
            card.innerHTML=`
              ${it.img?`<img src="${it.img}" class="card-img-top" alt="${it.ind}">`:''}
              <div class="card-body">
                <h5 class="card-title">${it.ind}</h5>
                <p class="card-text"><em>${it.ter}</em></p>
              </div>`;
            cont.appendChild(card);
          }
        });
      });
    });
  }

  // ======================
  // Dropdown kategori & tema
  // ======================
  function populateDropdown(){
    const cat=$('categorySelect');
    cat.innerHTML='';
    Object.keys(DICT).forEach(c=>{
      const o=document.createElement('option');
      o.value=c;o.textContent=c;
      cat.appendChild(o);
    });

    const theme=$('themeSelect');
    theme.innerHTML='';
    const firstCat = Object.keys(DICT)[0];
    cat.value = firstCat;
    const firstTheme = Object.keys(DICT[firstCat])[0];
    Object.keys(DICT[firstCat]).forEach(t=>{
      const o=document.createElement('option');
      o.value=t;o.textContent=t;
      theme.appendChild(o);
    });
    theme.value = firstTheme;
    renderCategory(firstCat, firstTheme);

    cat.addEventListener('change',()=>{
      theme.innerHTML='';
      if(DICT[cat.value]){
        Object.keys(DICT[cat.value]).forEach(t=>{
          const o=document.createElement('option');
          o.value=t;o.textContent=t;
          theme.appendChild(o);
        });
        theme.value=Object.keys(DICT[cat.value])[0];
        renderCategory(cat.value, theme.value);
      }
    });
    theme.addEventListener('change',()=>{
      renderCategory(cat.value, theme.value);
    });
  }

  // ======================
  // Dropdown filter tabel
  // ======================
  function populateAllCategorySelect(){
    const sel=$('allCategorySelect');
    sel.innerHTML='<option value="all">Semua Kategori</option>';
    Object.keys(DICT).forEach(c=>{
      const o=document.createElement('option');
      o.value=c;o.textContent=c;
      sel.appendChild(o);
    });
    sel.addEventListener('change',()=>renderTable(sel.value));
  }

  // ======================
  // Render tabel kamus
  // ======================
  function renderTable(filterCat="all"){
    const tb=$('tableBody');
    if(!tb) return;
    tb.innerHTML='';
    Object.entries(DICT).forEach(([cat,themes])=>{
      if(filterCat!=="all" && filterCat!==cat) return;
      Object.entries(themes).forEach(([theme,list])=>{
        list.forEach(it=>{
          const tr=document.createElement('tr');
          tr.innerHTML=`
            <td>${cat}</td>
            <td>${theme}</td>
            <td>${it.ind}</td>
            <td>${it.ter}</td>`;
          tb.appendChild(tr);
        });
      });
    });
  }

  // ======================
  // Init UI
  // ======================
  function initUI(){
    populateDropdown();
    populateAllCategorySelect();
    renderTable();

    $('translateBtn').addEventListener('click', async ()=>{
      const raw=$('inputText').value.trim();
      if(!raw) return;
      $('log').textContent='Memproses...';

      const dir=$('direction').value||'id-to-tt';
      let source=raw;

      if($('useAI').checked){
        try{
          const corrected=await callOpenAIcorrect(raw);
          source=corrected;
          $('log').textContent=`Kalimat dikoreksi: ${corrected}`;
        }catch(e){
          $('log').textContent='AI gagal: '+e.message+' → fallback ke kamus';
        }
      }else{
        $('log').textContent='Mode tanpa AI (langsung kamus)';
      }

      $('outputText').value=translateWithMap(source, dir);
    });

    $('translateSimpleBtn').addEventListener('click', ()=>{
      const raw=$('inputText').value.trim();
      const dir=$('direction').value||'id-to-tt';
      $('outputText').value=translateWithMap(raw, dir);
    });

    $('clearBtn').addEventListener('click', ()=>{
      $('inputText').value='';
      $('outputText').value='';
      $('log').textContent='';
    });

    $('swapBtn').addEventListener('click', ()=>{
      const sel=$('direction');
      sel.value= sel.value==='id-to-tt'?'tt-to-id':'id-to-tt';
    });

    $('copyBtn').addEventListener('click', async ()=>{
      try{
        await navigator.clipboard.writeText($('outputText').value||'');
        $('copyBtn').textContent='✓ Tersalin';
        setTimeout(()=>{$('copyBtn').textContent='📋 Salin';},1200);
      }catch{alert('Gagal salin');}
    });

    $('speakBtn').addEventListener('click', ()=>{
      const t=$('outputText').value||'';
      const u=new SpeechSynthesisUtterance(t);
      u.lang='id-ID';
      speechSynthesis.speak(u);
    });

    $('btnSearch').addEventListener('click', ()=>{
      const q=$('searchWord').value.trim().toLowerCase();
      if(q) renderFilter(q);
      else renderCategory($('categorySelect').value, $('themeSelect').value);
    });
    $('searchWord').addEventListener('input', ()=>{
      const q=$('searchWord').value.trim().toLowerCase();
      if(q) renderFilter(q);
      else renderCategory($('categorySelect').value, $('themeSelect').value);
    });
  }

  document.addEventListener('DOMContentLoaded', initUI);
})();
