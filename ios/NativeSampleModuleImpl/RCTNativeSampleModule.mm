#import <Foundation/Foundation.h>

#include "RCTNativeSampleModule.h"

@implementation NativeSampleModule

RCT_EXPORT_MODULE(NativeSampleModule)


- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeSampleModuleSpecJSI>(params);
}


- (void)stringPromise:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  resolve(@"hello");
}

@end
