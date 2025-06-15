//
//  RodinAppBlockerVPNManager.m
//  rodinmobile
//
//  Created by Alexandre TAHI on 15/06/2025.
//

#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(RodinVPNManager, NSObject)

RCT_EXTERN_METHOD(configure:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(startVPN:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(stopVPN:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(sendBlockedDomains:(NSArray *)domains resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

@end
