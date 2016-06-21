//
//  CalendarManager.m
//  LearnProject
//
//  Created by 王庆 on 6/16/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "CalendarManager.h"
#import "RCTLog.h"
#import "RCTConvert.h"

@implementation CalendarManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)name details:(NSDictionary *) details)
{
  NSString *location = [RCTConvert NSString:details[@"location"]];
  NSDate *time = [RCTConvert NSDate:details[@"time"]];
  
  RCTLogInfo(@"%@ in %@, %@", name, location, time);
}

RCT_EXPORT_METHOD(findEvents:(RCTResponseSenderBlock) callback)
{
  
}

@end
