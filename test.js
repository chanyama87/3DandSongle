window.onload = load_songle; // 画面読み込み完了時のイベントハンドラ
window.onSongleWidgetReady = ready; // songleWidgetのイベントハンドラ

function load_songle() { // イベントハンドラ（load_songle）
  var songleWidgetElement =  // SongleWidget要素を作成
  SongleWidgetAPI.createSongleWidgetElement( {
    api: "songle-widget-api-example",  // API属性に任意の文字列を設定
    url: "www.youtube.com/watch?v=PqJNc9KVIZE", // 楽曲のURL（初音ミク）
    });
    document.body.appendChild(songleWidgetElement); // DOM要素を追加
}//load_songle関数に関する記述はここまで

function ready(apiKey, songleWidget) { // イベントハンドラ（ready）
  //draw_cgの中身
  var scene = new THREE.Scene();  // シーンの作成

//カメラ
  var aspect = window.innerWidth / window.innerHeight; // aspect比
  var camera = new THREE.PerspectiveCamera( 80, aspect, 1, 2000 ); // camera(画角、アスペクト比、捉える範囲、捉える範囲)
  camera.position.set(0,10,100); // カメラを設置する位置
  //マウスによるカメラ操作
     var trckblCtrls = new THREE.TrackballControls(camera); //カメラコントロールの定義
     trckblCtrls.rotateSpeed= 1.0;　//回転する速さ
     trckblCtrls.zoomSpeed=1.0;　//ズームさせる速さ
     trckblCtrls.panSpeed=1.0;　//パンさせるはやさ

  //レンダラー
    var renderer = new THREE.WebGLRenderer();  // レンダラーの作成
    renderer.setClearColor(new THREE.Color(0xEEEEEE));  // 背景色の設定
    renderer.setPixelRatio(window.devicePixelRatio);//レンダラーのサイズ調整(ウィンドウの大きさ変えても全画面にフィットする)
    renderer.setSize(window.innerWidth, window.innerHeight); // サイズ設定
    renderer.shadowMap.enabled=true; //影(shadowMap)を有効
    document.body.appendChild(renderer.domElement); // DOM要素を追加
    renderer.render(scene, camera); // シーンのレンダリング

  //コード変更するときの図形
  var cubeGeo = new THREE.BoxGeometry(20, 20, 20); // 立方体ジオメトリ(再利用可)
  var maruGeo = new THREE.SphereGeometry(5,32,32); //円ジオメトリ(再利用可)
  var coneGeo = new THREE.ConeGeometry(5, 20, 32); //三角錐ジオメトリ(直径、高さ、円周)(再利用可)

  //マテリアル
  var cubeMat = new THREE.MeshStandardMaterial({color:0xFF0000}); // Material(red)
  var cubeMat2 = new THREE.MeshPhongMaterial({color:0x26AF94}); // Material（peacockgreen）
  var maruMat1 = new THREE.MeshPhongMaterial({color:0x32CCB6});　// material(jewel green)
  var maruMat2 = new THREE.MeshPhongMaterial({color:0x0F52BC});　// material(シアン)
  var coneMat1 = new THREE.MeshPhongMaterial({color:0xE50076});//material(マゼンタ、円錐用)
  var cocoaMat = new THREE.MeshPhongMaterial({color:0x7C5335}); //(cocoa)
  var planeMat = new THREE.MeshPhongMaterial({color:0xd19147}); //(ラクダ＝プレーン)
  var maruMat3 = new THREE.MeshPhongMaterial({color:0x0C00CC});　// material(blue)
  var coneMat2 = new THREE.MeshPhongMaterial({color:0xFFF10F});//material(sunflower、円錐用)
  var maruMat3 = new THREE.MeshPhongMaterial({color:0x95FF65});　// material(若草いろ)
  //メッシュ
  var cube = new THREE.Mesh(cubeGeo, cubeMat); // 立方体メッシュの作成
  cube.castShadow=true; //影を落とす
  var cube2 = new THREE.Mesh(cubeGeo, cubeMat2); // 立方体メッシュの作成(サビ用)
  cube2.castShadow=true; //影を落とす
  var maru1 = new THREE.Mesh(maruGeo, maruMat1); //円メッシュの作成(メロディ区間用)
  maru1.castShadow=true; //影を落とす
  var cone1 = new THREE.Mesh(coneGeo, coneMat1);//三角錐メッシュの作成(カウント表示)
  cone1.castShadow=true; //影を落とす
  var maru2 = new THREE.Mesh(maruGeo, maruMat2); //円メッシュの作成(カウント表示)
  maru2.castShadow=true; //影を落とす
  var cocoa= new THREE.Mesh(maruGeo, cocoaMat); //ドーナツメッシュの作成
  cocoa.castShadow=true; //影を落とす
  var plane= new THREE.Mesh(maruGeo, planeMat); //ドーナツメッシュの作成
  plane.castShadow=true; //影を落とす
  var count1= new THREE.Mesh(maruGeo, coneMat1); //円メッシュの作成カウント表示
  count1.castShadow=true; //影を落とす
  var count2= new THREE.Mesh(maruGeo, maruMat3); //円メッシュの作成カウント表示
  count2.castShadow=true; //影を落とす
  var count3= new THREE.Mesh(coneGeo, coneMat2); //円錐メッシュの作成カウント表示
  count3.castShadow=true; //影を落とす
  var count4= new THREE.Mesh(maruGeo, maruMat3); //円メッシュの作成カウント表示
  count4.castShadow=true; //影を落とす

  //設置(x,y,z)
  cube.position.set(-30,40,20); // 立方体(常設)の位置
  cube2.position.set(0,30,0); //cube2(サビ用)の位置
  maru1.position.set(10,10,0);　//丸１の位置
  cone1.position.set(30,10,0); //三角錐を設置(カウント1)
  maru2.position.set(40,10,0);//円２を設置(カウント2)
  cocoa.position.set(50,10,0); //cocoaを設置１(カウント3)
  plane.position.set(60,10,0); //planeを設置(カウント4)
  count1.position.set(-10,20,10); //円錐(count1)の位置
  count2.position.set(-20,20,10); //円錐(count2)の位置
  count3.position.set(-30,20,10); //円錐(count3)の位置
  count4.position.set(-40,20,10); //円錐(count14)の位置

  //床
  var floor= new THREE.Mesh( //床を作る
    new THREE.BoxGeometry(2000, 0.1, 2000), //面積2000*2000
    new THREE.MeshStandardMaterial({ color: 0xDDDED3, roughness:0.0 }) //背景色と同じマテリアル
  ); //変数floorの記述ここまで
  floor.receiveShadow= true; //影を受け付ける
  scene.add(floor); //影を有効にした床の設置

//光源の設定
  var light= new THREE.DirectionalLight(0xFFFFFF); //光源の種類と色（白）　床が変わった
  light.position.set(0,70,30); //光源の位置（x,y,z)
  scene.add(light);　//追加
  var lightk= new THREE.DirectionalLight(0xEFC1C4,1); //光源の種類と色（ベビーピンク,メロディ区間奇数）
  lightk.castShadow=true; //影を有効
  lightk.position.set(30,50,20); //光源の位置（x,y,z)
  var lightg= new THREE.DirectionalLight(0x9CA7E2,1); //光源の種類と色（スカイブルー、メロディ区間偶数）
  lightg.castShadow=true; //影を有効
  lightg.position.set(30,50,20); //光源の位置（x,y,z)

  //スポットライト作成(色、強さ、距離、照射角、ボケ具合、減衰率)
  var spotlight1= new THREE.SpotLight(0xFFFF00,2,30,Math.PI/4, 10, 0.5); //黄色
  spotlight1.castShadow= true;//ライトの影を有効
  var spotlight2= new THREE.SpotLight(0x00FF41,2,30,Math.PI/4, 10, 0.5);　//緑色
  spotlight2.castShadow= true;//ライトの影を有効
  var spotlight3= new THREE.SpotLight(0xFAFAFA,4,500,Math.PI/4, 20, 0.5); //白
  spotlight3.castShadow= true;//ライトの影を有効
  spotlight3.position.set(0,200,0);//spotlight3の位置（x,y,z)
  scene.add(spotlight3);//設置
  var spotlight4= new THREE.SpotLight(0xCC0000,5,200,Math.PI/4, 10, 0.5); //赤
  spotlight4.castShadow= true;//ライトの影を有効
  spotlight4.position.set(20,100,-10);//spotlight4の位置（x,y,z)
  var spotlight5= new THREE.SpotLight(0x0C00CC,5,200,Math.PI/4, 10, 0.5); //青
  spotlight5.castShadow= true;//ライトの影を有効
  spotlight5.position.set(-50,100,-10);//spotlight5の位置（x,y,z)

  //ポイントライト(大きさは統一)
  var intensity = 2.5; //光の強さ
  var distance = 100; //距離
  var decay =2.0; //減衰率
  var ten = new THREE.SphereBufferGeometry(1,10,10); //ポイントライトの点の大きさ
  var c1=0x47EA7E, c2=0xFFB74C, c3=0x8700CC; //色 1:エメラルドグリーン　２：オレンジ　３：バイオレット
  var ten1= new THREE.PointLight(c1, intensity, distance, decay); //ポイントライト１(常設)
  ten1.add(new　THREE.Mesh(ten, new THREE.MeshBasicMaterial({color: c1})));//形と光を合成 緑の光
  ten1.castShadow=true; //影を有効
  ten1.position.set(15,30,0); //位置を設定（x,y,z)
  var ten2= new THREE.PointLight(c2, intensity, distance, decay); //ポイントライト２(サビ用)
  ten2.add(new　THREE.Mesh(ten, new THREE.MeshBasicMaterial({color: c2})));//形と光を合成 オレンジの光
  ten2.castShadow=true; //影を有効
  var ten3= new THREE.PointLight(c3, intensity, distance, decay); //ポイントライト３(サビ用)
  ten3.add(new　THREE.Mesh(ten, new THREE.MeshBasicMaterial({color: c3})));//形と光を合成 バイオレットの光
  ten3.castShadow=true; //影を有効
  var ten4= new THREE.PointLight(c1, intensity, distance, decay); //ポイントライト４(常設)
  ten4.add(new THREE.Mesh(ten, new THREE.MeshBasicMaterial({color: c1})));//形と光を合成 緑の光
  ten4.castShadow=true; //影を有効
  ten4.position.set(-15,50,-10);//位置を設定（x,y,z)
  scene.add(ten1);//設置
  scene.add(ten4);//設置

  //演出
  function animate(){ //１サビ用演出をする関数を定義
  cube2.rotation.y=cube2.rotation.y+Math.PI/180;　//cube2をy軸周りに1度
  var clock= new THREE.Clock(); //経過時間を取得するためのオブジェクト
  var delta= clock.getDelta();//前回getDelta()がよばれたときの時間を取得
  trckblCtrls.update(delta); //前回updateからのカメラの差分を更新
  renderer.render(scene,camera);　//レンダリング
  requestAnimationFrame(animate); //animate関数を実行
} //animate関数の記述ここまで

 function movelight(){ //演出用ライトを実行する関数を定義
   //照明の位置を更新
   var t= Date.now()/500;　//現在までの経過時間(ミリ単位)/500
   var r=10.0; //コサイン、シンに掛ける変数
   var a=r * Math.cos(t);　//コサイン(x)
   var b=r * Math.sin(t); //シン(z)
   var c= 6.0+5.0*Math.sin(t/3.0); //ベクトルのz値１(y)
    var d= 7.0+13.0*Math.sin(t/3.0); //ベクトルのz値２(y)
   ten2.position.set(a, c, b); //位置を設定（x,y,z)
   ten3.position.set(a, d, b); //位置を設定（x,y,z)
   ten2.lookAt(new THREE.Vector3(0,0,0)); //3次元ベクトルでカメラの中心座標を設定
   ten3.lookAt(new THREE.Vector3(10,20,10)); //3次元ベクトルでカメラの中心座標を設定
   requestAnimationFrame(movelight); //movelight関数を実行
   renderer.render(scene, camera);//レンダリング
 }//movelight関数の記述ここまで

 function moveSPlight(){ //スポットライトを動かす関数を定義
   var t2= Date.now()/500;　//現在までの経過時間(ミリ単位)/500
   var r2=30.0; //コサイン、シンに掛ける変数
   var e=r2 * Math.cos(t2);　//コサイン(x)
   var f=r2 * Math.sin(t2); //シン(z)
   var g= 30.0+5.0*Math.sin(t2/4.0); //ベクトルのz値１(y)
   var h= 40.0+13.0*Math.sin(t2/4.0); //ベクトルのz値２(y)
   spotlight1.position.set(e,g,f);//位置を設定（x,y,z)
   spotlight2.position.set(e,h,f);//位置を設定（x,y,z)
   requestAnimationFrame(moveSPlight); //moveSPlight関数を実行
   renderer.render(scene, camera);//レンダリング
 }//moveSPlight関数の記述ここまで

songleWidget.on("chorusEnter", function(){ //サビに入ったイベント
  console.log("chorus now"); //コンソールに表示
  scene.add(cube2); //サビ用の物体
  scene.add(spotlight1); //サビ用光源
  scene.add(spotlight2); //サビ用光源
  scene.add(spotlight4);//サビ用光源
  scene.add(spotlight5);//サビ用光源
  // scene.add(lightHelper5);
  scene.add(ten2);　//ポイントライト追加
  scene.add(ten3);//ポイントライト追加
   animate(); //回す
   movelight(); //実行
   moveSPlight();//実行
  renderer.render(scene, camera); //シーンのレンダリング
});//chorusEnterに関する記述ここまで

songleWidget.on("chorusLeave", function(){ //サビからでたイベント
  console.log("chorus done"); //コンソールに表示
  scene.remove(cube2);　//取り除く
  scene.remove(spotlight1); //取り除く
  scene.remove(spotlight2); //サビ用光源
  scene.remove(ten2);//ポイントライト削除
  scene.remove(ten3);//ポイントライト削除
  scene.remove(spotlight4);//サビ用光源削除
  scene.remove(spotlight5);//サビ用光源削除
  renderer.render(scene,camera);　//シーンのレンダリング
});//chorusLeaveに関する記述ここまで

//拍になったイベントに関するイベントハンドラの設定 
songleWidget.on("beatPlay", function(event){//拍が打たれた時の動作
  if(event.beat.position===1){//1拍目
    console.log("1st");　//コンソールに表示
    document.body.className="lightblue"; //bodyタグのクラスをlightblueに
    scene.add(cone1);//カウント１図形追加
    scene.add(count1);//カウント１図形追加
    scene.add(lightk);//奇数ライト追加
    scene.remove(lightg);//偶数ライト削除
    scene.remove(plane);//カウント4図形削除
    scene.remove(count4);//カウント4図形削除
  }//1拍目に関する記述はここまで
  else if(event.beat.position===2){ //2拍め
    console.log("2nd");　//コンソールに表示
    scene.add(maru2);//カウント２図形追加
    scene.add(count2);//カウント2図形追加
    scene.add(lightg);//偶数ライト追加
    scene.remove(lightk);//奇数ライト削除
    scene.remove(cone1);//カウント１図形削除
    scene.remove(count1);//カウント１図形削除
  }//２拍目に関する記述はここまで
  else if(event.beat.position===3){ //3拍め
    console.log("3rd"); //コンソールに表示
    document.body.className="pink"; //bodyタグのクラスをpinkに
    scene.add(cocoa);//カウント３図形追加
    scene.add(count3);//カウント3図形追加
    scene.add(lightk);//奇数ライト追加
    scene.remove(lightg);//ライト削除
    scene.remove(maru2);//カウント２図形削除
    scene.remove(count2);//カウント2図形削除
  } //3拍目に関する記述はここまで
  else if(event.beat.position===4){ //4拍め
    console.log("4th"); //コンソールに表示
    scene.add(lightg);//偶数ライト追加
    scene.add(plane);//カウント４図形追加
    scene.add(count4);//カウント4図形追加
    scene.remove(cocoa);//カウント３図形削除
    scene.remove(count3);//カウント3図形削除
    scene.remove(lightk);//奇数ライト削除
  }//4拍目に関する記述はここまで
}); //beatPlayに関する記述はここまで

//青区間イベント
 songleWidget.on("repeatEnter", function(event){
  console.log("青区間はじめ"); //コンソールに表示
  scene.add(maru1);　//  物体追加
  scene.add(cube);//物体追加
  scene.add(light); //光源出す
  renderer.render(scene,camera);　//カメラのレンダリング
}); //repeatEnterに関する記述はここまで

 songleWidget.on("repeatleave", function(event){
  console.log("青区間終わり"); //コンソールに表示
  scene.remove(maru1);　//  物体を消す
  renderer.render(scene,camera);　//カメラのレンダリング
}); //repeatleaveに関する記述はここまで

}　//ready関数に関する記述はここまで
