from enum import Enum


class EventType(str, Enum):
    Subscription = "Subscription"
    View = "View"


class DeviceType(str, Enum):
    Web = "Web"
    Mobile = "Mobile"


class ObjectType(str, Enum):
    Feed = "Feed"
    Configuration = "Configuration"


class ReportType(str, Enum):
    ActivityReport = "ActivityReport"
    ContentAnalysisReport = "ContentAnalysisReport"


class AggregateType(str, Enum):
    FeedViews = "FeedViews"
    FeedSubscriptions = "FeedSubscriptions"
    FeedSubscriptionsViews = "FeedSubscriptionsViews"
    TopicsViews = "TopicsViews"
    TopicsSubscriptions = "TopicsSubscriptions"
    KeywordsViews = "KeywordsViews"
    SourcesViews = "SourcesViews"


class AggregationEntityType(str, Enum):
    tag = "tag"
    keyword = "keyword"
    source = "source"
