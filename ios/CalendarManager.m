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

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location date:
                  (NSDate *)date)
{
  RCTLogInfo(@"%@ in %@", name, location);
}

@end
