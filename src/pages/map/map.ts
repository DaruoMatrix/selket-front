import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import leaflet from 'leaflet';
import { DisplayBanksPage } from '../display-banks/display-banks';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  
})
  export class MapPage {
    @ViewChild('map') mapContainer:ElementRef
    map:any
    client;
  constructor(public restService:RestProvider,public navCtrl: NavController, public navParams: NavParams) {

    //console.log("client : ", this.client);
  }


  ngOnInit() { 
    this.restService.currentUser.subscribe(client => this.client = client);
    console.log("client : ", this.client);
    
  }
  ionViewDidEnter() {
    this.loadmap();
  }

  //
  getUserForm(){
    
  }
  goBanks() {
    this.navCtrl.push(DisplayBanksPage);
  }

  loadmap() {
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Tunis',
      maxZoom: 18
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (e) => {
      let markerGroup = leaflet.featureGroup();
      let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => {
        alert('Marker clicked');
      })
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
      }).on('locationerror', (err) => {
        alert(err.message);
    })
 
  }
}
